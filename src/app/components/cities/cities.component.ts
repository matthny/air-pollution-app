import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenAQService } from 'src/app/api/open-aq.service';
import { OpenAQResponse, CommonHelper, Parameter, SortEvent, SortDirection } from 'src/app/helpers/common-helper';
import { Country } from 'src/app/models/country';
import { PollutionGridElement } from 'src/app/models/pollution-grid-element';
import { Column } from 'src/app/models/column';
import { GridService } from 'src/app/services/grid.service';
import { Measurement } from 'src/app/models/measurement';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

export interface Parameters {
  [param: string]: string;
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(
    private openAQService: OpenAQService,
    private gridService: GridService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {
  }

  private COLUMNS: Column[] = [
    Column.city,
    Column.co,
    Column.no2,
    Column.o3,
    Column.pm10,
    Column.pm25,
    Column.so2,
    Column.bc
  ];

  private PARAMETERS: Parameters = {
    [Parameter.co.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.co.toString()),
    [Parameter.no2.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.no2.toString()),
    [Parameter.o3.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.o3.toString()),
    [Parameter.pm10.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.pm10.toString()),
    [Parameter.pm25.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.pm25.toString()),
    [Parameter.so2.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.so2.toString()),
    [Parameter.bc.toString()]: CommonHelper.getFormattedHTMLParameter(Parameter.bc.toString()),
  };

  private showDatePicker: boolean;
  private fromDate: Date;
  private toDate: Date;

  private cityColumn = Column.city;
  private coColumn = Column.co;
  private no2Column = Column.no2;
  private o3Column = Column.o3;
  private pm10Column = Column.pm10;
  private pm25Column = Column.pm25;
  private so2Column = Column.so2;
  private bcColumn = Column.bc;

  private countries: Country[] = [];

  private citiesPollutionForm: FormGroup;

  private measurementGridDataSource: PollutionGridElement[] = [];
  private measurementGridDataSourceAngularMaterial: MatTableDataSource<PollutionGridElement> = new MatTableDataSource([]);
  private measurementGridGridColumns: Column[] = [];

  public isLoading: boolean;

  ngOnInit() {
    this.initialize();
  }

  private initialize(): void {
    this.setCitiesPollutionForm();
    this.setCountries();
  }

  private setCitiesPollutionForm(): void {
    this.citiesPollutionForm = new FormGroup({
      country: new FormControl(''),
      parameter: new FormControl(''),
      dateType: new FormControl('now'),
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    });
  }

  private setCountries(): void {
    this.openAQService.getCountries().subscribe(
      (data: OpenAQResponse) => {
        if (data.results != null) {
          this.countries = data.results
            .map(result => new Country(result))
            .filter(result => result.name != null)
            .sort(Country.alphabeticalComparator);
        } else {
          this.countries = [];
        }
      },
      () => {
        this.snackBar.open(this.translate.instant('error'), this.translate.instant('errorAction'), {duration: 4000});
      }
    );
  }

  private setMeasurementsRequestDates(): void {
    if (this.citiesPollutionForm.value.dateType === 'now') {
      this.fromDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)); // 24h from now
      this.toDate = new Date();
    } else if (this.citiesPollutionForm.value.dateType === 'dateRange') {
      this.fromDate = CommonHelper.getFromDateUTC(this.citiesPollutionForm.value.fromDate);
      this.toDate = CommonHelper.getToDateUTC(this.citiesPollutionForm.value.toDate);
    }
  }

  private onGoClick(): void {
    this.setValidators();
    this.resetMeasurementGrid();

    if (this.citiesPollutionForm.valid) {
      this.isLoading = true;
      this.setMeasurementsRequestDates();

      Promise.all([
        this.openAQService.getMeasurementsForCountry(
          this.citiesPollutionForm.value.country,
          this.citiesPollutionForm.value.parameter,
          this.fromDate.toISOString() ,
          this.toDate.toISOString()
        ).toPromise()
      ])
      .then((result: OpenAQResponse[]) => {
        if (result[0].results != null && result[0].results.length > 0) {
          this.setMeasurementGrid(result[0]);
        } else {
          this.snackBar.open(this.translate.instant('errorNoData'), this.translate.instant('errorAction'), {duration: 4000});
        }
      })
      .catch(() => {
        this.snackBar.open(this.translate.instant('error'), this.translate.instant('errorAction'), {duration: 4000});
      })
      .finally(() => {
        this.isLoading = false;
      });

      this.clearValidators();
    }
  }

  private onDateToggleChange(): void {
    if (this.citiesPollutionForm.value.dateType === 'now') {
      this.showDatePicker = false;
    } else if (this.citiesPollutionForm.value.dateType === 'dateRange') {
      this.showDatePicker = true;
    }
  }

  private setMeasurementGrid(data: OpenAQResponse) {
    this.resetMeasurementGrid();

    const measurements: Measurement[] =  data.results != null
      ? data.results.map((result: any) => {
        return new Measurement(result);
      })
      : null;

    this.measurementGridDataSource = this.gridService.getCitiesGridDataSource(
      this.citiesPollutionForm.value.parameter,
      measurements
    );

    this.measurementGridDataSourceAngularMaterial = new MatTableDataSource(this.measurementGridDataSource);

    this.measurementGridGridColumns = this.gridService.getPollutionGridColumns(this.COLUMNS, this.measurementGridDataSource);
  }

  private resetMeasurementGrid(): void {
    this.measurementGridDataSource = [];
    this.measurementGridDataSourceAngularMaterial = new MatTableDataSource([]);
    this.measurementGridGridColumns = [];
  }

  private onMatSortChange(e: SortEvent) {
    this.gridService.sort(this.measurementGridDataSourceAngularMaterial, e.active, e.direction);
    this.measurementGridDataSourceAngularMaterial._updateChangeSubscription();
  }

  private onParameterSelected(event): void {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll('div.mat-select-value');
    elements[1].innerHTML = CommonHelper.getFormattedHTMLParameter(event.value);
  }

  private setValidators(): void {
    this.citiesPollutionForm.controls.country.setValidators(Validators.required);
    this.citiesPollutionForm.controls.parameter.setValidators(Validators.required);

    if (this.showDatePicker) {
      this.citiesPollutionForm.controls.fromDate.setValidators(Validators.required);
      this.citiesPollutionForm.controls.toDate.setValidators(Validators.required);
    } else if (!this.showDatePicker) {
      this.citiesPollutionForm.controls.fromDate.clearValidators();
      this.citiesPollutionForm.controls.toDate.clearValidators();
    }

    this.updateValidators();
  }

  private clearValidators(): void {
    this.citiesPollutionForm.controls.country.clearValidators();
    this.citiesPollutionForm.controls.parameter.clearValidators();
    this.citiesPollutionForm.controls.fromDate.clearValidators();
    this.citiesPollutionForm.controls.toDate.clearValidators();

    this.updateValidators();
  }

  private updateValidators(): void {
    this.citiesPollutionForm.controls.country.updateValueAndValidity();
    this.citiesPollutionForm.controls.parameter.updateValueAndValidity();
    this.citiesPollutionForm.controls.fromDate.updateValueAndValidity();
    this.citiesPollutionForm.controls.toDate.updateValueAndValidity();
  }
}
