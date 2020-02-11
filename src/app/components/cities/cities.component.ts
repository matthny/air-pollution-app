import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenAQService } from 'src/app/api/open-aq.service';
import { OpenAQResponse, CommonHelper, Parameter } from 'src/app/helpers/common-helper';
import { Country } from 'src/app/models/country';
import { PollutionGridElement } from 'src/app/models/pollution-grid-element';
import { Column } from 'src/app/models/column';
import { GridService } from 'src/app/services/grid.service';
import { Measurement } from 'src/app/models/measurement';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(
    private openAQService: OpenAQService,
    private gridService: GridService,
  ) {
  }

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
  private measurementGridGridColumns: Column[] = [];


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
      // city: new FormControl(''),
      // location: new FormControl(''),
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
    this.setMeasurementsRequestDates();


    Promise.all([
      this.openAQService.getMeasurementsForCountry(
        this.citiesPollutionForm.value.country,
        Parameter.pm10,
        this.fromDate.toISOString() ,
        this.toDate.toISOString()
      ).toPromise()
    ])
    .then((result: OpenAQResponse[]) => {
      this.setMeasurementGrid(result[0]);
    });
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

    this.measurementGridDataSource = this.gridService.getPollutionGridElementsForCountry(Parameter.pm10, measurements);
    this.measurementGridGridColumns = this.gridService.getPollutionGridColumns(this.measurementGridDataSource);
    this.measurementGridGridColumns.splice(0,1);
    
  }

  private resetMeasurementGrid(): void {
    this.measurementGridDataSource = [];
    this.measurementGridGridColumns = [];
  }

}
