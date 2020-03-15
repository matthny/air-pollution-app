import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';


import { OpenAQService } from '../../api/open-aq.service';
import { OpenAQResponse, SortEvent } from '../../helpers/common-helper';

import { PollutionGridElement } from '../../models/pollution-grid-element';


import { CommonHelper} from '../../helpers/common-helper';

import { Country } from '../../models/country';
import { City } from '../../models/city';
import { Location } from '../../models/location';
import { LatestPollution } from '../../models/latest-pollution';
import { LatestMeasurement } from '../../models/latest-measurement';
import { Measurement } from '../../models/measurement';
import { GridService } from '../../services/grid.service';
import { Column } from '../../models/column';
import { PollutionWarningService } from '../../services/pollution-warning.service';
import { Warning } from '../../models/warning';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit {

  constructor(
    private openAQService: OpenAQService,
    private gridService: GridService,
    private pollutionWarningService: PollutionWarningService,
    private translate: TranslateService
  ) {
  }

  private COLUMNS: Column[] = [
    Column.date,
    Column.co,
    Column.no2,
    Column.o3,
    Column.pm10,
    Column.pm25,
    Column.so2,
    Column.bc
  ];


  private archiveView: boolean;

  private showDatePicker: boolean;
  private fromDate: Date;
  private toDate: Date;

  private dateColumn = Column.date;
  private coColumn = Column.co;
  private no2Column = Column.no2;
  private o3Column = Column.o3;
  private pm10Column = Column.pm10;
  private pm25Column = Column.pm25;
  private so2Column = Column.so2;
  private bcColumn = Column.bc;

  private countries: Country[] = [];
  private cities: City[] = [];
  private locations: Location[] = [];

  public pollutionForm: FormGroup;

  private latestPollutionGridDataSource: PollutionGridElement[] = [];
  private latestPollutionGridColumns: Column[] = [];

  private measurementGridDataSource: PollutionGridElement[] = [];
  private measurementGridDataSourceAngularMaterial: MatTableDataSource<PollutionGridElement> = new MatTableDataSource([]);
  private measurementGridGridColumns: Column[] = [];

  private warnings: Warning[];


  ngOnInit() {
    this.initialize();
  }

  private initialize(): void {
    this.setPollutionForm();
    this.setCountries();
  }

  private setPollutionForm(): void {
    this.pollutionForm = new FormGroup({
      country: new FormControl(''),
      city: new FormControl({
        value: '',
        disabled: true
      }),
      location: new FormControl({
        value: '',
        disabled: true
      }),
      dateType: new FormControl('now'),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  private setCountries(): void {
    this.openAQService.getCountries().subscribe((data: OpenAQResponse) => {
      if (data.results != null) {
        this.countries = data.results
          .map(result => new Country(result))
          .filter(result => result.name != null)
          .sort(Country.alphabeticalComparator);
      } else {
        this.countries = [];
      }
    });
  }

  private setCities(countryCode: string): void {
    this.openAQService.getCities(countryCode).subscribe((data: OpenAQResponse) => {
      if (data.results != null) {
        this.cities = data.results
          .map(result => new City(result))
          .filter(result => result.city != null)
          .sort(City.alphabeticalComparator);

        this.pollutionForm.controls.city.enable();
      } else {
        this.cities = [];
      }
    });
  }

  private setLocations(city: string): void {
    this.openAQService.getLocations(city).subscribe((data: OpenAQResponse) => {
      if (data.results != null) {
        this.locations = data.results
          .map(result => new Location(result))
          .filter(result => result.sourceName != null)
          .sort(Location.alphabeticalComparator);

        this.pollutionForm.controls.location.enable();
      } else {
        this.locations = [];
      }
    });
  }

  private setMeasurementsRequestDates(): void {
    if (this.pollutionForm.value.dateType === 'now') {
      this.fromDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)); // 24h from now
      this.toDate = new Date();
    } else if (this.pollutionForm.value.dateType === 'dateRange') {
      this.fromDate = CommonHelper.getFromDateUTC(this.pollutionForm.value.fromDate);
      this.toDate = CommonHelper.getToDateUTC(this.pollutionForm.value.toDate);
    }
  }

  private setArchiveView(): void {
    if (this.pollutionForm.value.dateType === 'now') {
      this.archiveView = false;
    } else if (this.pollutionForm.value.dateType === 'dateRange') {
      this.archiveView = true;
    }
  }

  private checkViewType(): void {
    this.setMeasurementsRequestDates();
    this.setArchiveView();
  }

  private onGoClick(): void {
    this.setValidators();

    if (this.pollutionForm.valid) {
      this.checkViewType();

      Promise.all([
        this.openAQService.getLatestPollution(this.pollutionForm.value.location).toPromise(),
        this.openAQService.getMeasurementsForLocation(
          this.pollutionForm.value.location,
          this.fromDate.toISOString() ,
          this.toDate.toISOString()
        ).toPromise()
      ])
      .then((result: OpenAQResponse[]) => {
        this.setLatestPollutionGrid(result[0]);
        this.setMeasurementGrid(result[1]);

        this.pollutionWarningService.reset();
        this.pollutionWarningService.addMeasurements(this.latestPollutionGridDataSource);
        this.pollutionWarningService.addMeasurements(this.measurementGridDataSource);
        this.pollutionWarningService.addColumns(this.latestPollutionGridColumns);
        this.pollutionWarningService.prepareWarnings();
        this.warnings = this.pollutionWarningService.getWarnings();
      });

      this.clearValidators();
    }
  }

  private setLatestPollutionGrid(data) {
    this.resetLatestPollutionGrid();

    const latestPollution: LatestPollution =  data.results != null ? new LatestPollution(data.results[0]) : null;

    this.latestPollutionGridDataSource = this.gridService.getPollutionGridDataSource(latestPollution.measurements);
    this.latestPollutionGridColumns = this.gridService.getPollutionGridColumns(this.COLUMNS, this.latestPollutionGridDataSource);
  }

  private setMeasurementGrid(data) {
    this.resetMeasurementGrid();

    const measurements: Measurement[] =  data.results != null
      ? data.results.map((result: any) => {
        return new Measurement(result);
      })
      : null;

    this.measurementGridDataSource = this.gridService.getPollutionGridDataSource(measurements);
    this.measurementGridDataSourceAngularMaterial = new MatTableDataSource(this.measurementGridDataSource);
    this.measurementGridGridColumns = this.gridService.getPollutionGridColumns(this.COLUMNS, this.measurementGridDataSource);
  }

  private onCountrySelected(e: any): void {
    this.pollutionForm.controls.city.reset();
    this.pollutionForm.controls.location.reset();
    this.cities = [];
    this.locations = [];
    this.pollutionForm.controls.location.disable();

    this.setCities(e.value);
  }

  private onCitySelected(e: any): void {
    this.pollutionForm.controls.location.reset();
    this.locations = [];

    this.setLocations(e.value);
  }

  private resetLatestPollutionGrid(): void {
    this.latestPollutionGridDataSource = [];
    this.latestPollutionGridColumns = [];
  }

  private resetMeasurementGrid(): void {
    this.measurementGridDataSource = [];
    this.measurementGridGridColumns = [];
  }

  private onDateToggleChange(): void {
    if (this.pollutionForm.value.dateType === 'now') {
      this.showDatePicker = false;
    } else if (this.pollutionForm.value.dateType === 'dateRange') {
      this.showDatePicker = true;
    }
  }

  private onMatSortChange(e: SortEvent) {
    this.gridService.sort(this.measurementGridDataSourceAngularMaterial, e.active, e.direction);
    this.measurementGridDataSourceAngularMaterial._updateChangeSubscription();
  }

  private setValidators(): void {
    this.pollutionForm.controls.country.setValidators(Validators.required);
    this.pollutionForm.controls.city.setValidators(Validators.required);
    this.pollutionForm.controls.location.setValidators(Validators.required);

    if (this.showDatePicker) {
      this.pollutionForm.controls.fromDate.setValidators(Validators.required);
      this.pollutionForm.controls.toDate.setValidators(Validators.required);
    } else if (!this.showDatePicker) {
      this.pollutionForm.controls.fromDate.clearValidators();
      this.pollutionForm.controls.toDate.clearValidators();
    }

    this.updateValidators();
  }

  private clearValidators(): void {
    this.pollutionForm.controls.country.clearValidators();
    this.pollutionForm.controls.city.clearValidators();
    this.pollutionForm.controls.location.clearValidators();
    this.pollutionForm.controls.fromDate.clearValidators();
    this.pollutionForm.controls.toDate.clearValidators();

    this.updateValidators();
  }

  private updateValidators(): void {
    this.pollutionForm.controls.country.updateValueAndValidity();
    this.pollutionForm.controls.city.updateValueAndValidity();
    this.pollutionForm.controls.location.updateValueAndValidity();
    this.pollutionForm.controls.fromDate.updateValueAndValidity();
    this.pollutionForm.controls.toDate.updateValueAndValidity();
  }
}
