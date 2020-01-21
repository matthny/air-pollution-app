import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';


import { OpenAQService } from '../api/open-aq.service';
import { OpenAQResponse } from '../helpers/common-helper';

import { PollutionGridElement } from '../models/pollution-grid-element';


import { CommonHelper} from '../helpers/common-helper';

import { Country } from '../models/country';
import { City } from '../models/city';
import { Location } from '../models/location';
import { LatestPollution } from '../models/latest-pollution';
import { LatestMeasurement } from '../models/latest-measurement';
import { Measurement } from '../models/measurement';
import { GridService } from '../services/grid.service';
import { Column } from '../models/column';
import { PollutionWarningService } from '../services/pollution-warning.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit {

  constructor(
    private openAQService: OpenAQService,
    private gridService: GridService,
    private pollutionWarningService: PollutionWarningService
  ) {
  }

  private fromDate: Date = new Date (new Date().getTime() - (24 * 60 * 60 * 1000)); // 24h from now

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
  private latestPollutionGridColumns: any[] = [];

  private measurementGridDataSource: PollutionGridElement[] = [];
  private measurementGridGridColumns: any[] = [];


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
      city: new FormControl(''),
      location: new FormControl(''),
      dateType: new FormControl('now')
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
      } else {
        this.locations = [];
      }
    });
  }

  private onGoClick(): void {
    Promise.all([
      this.openAQService.getLatestPollution(this.pollutionForm.value.location).toPromise(),
      this.openAQService.getMeasurements(
        this.pollutionForm.value.location,
        this.fromDate.toISOString() ,
        new Date().toISOString()
      ).toPromise()
    ])
    .then((result: OpenAQResponse[]) => {
      this.setLatestPollutionGrid(result[0]);
      this.setMeasurementGrid(result[1]);

      this.pollutionWarningService.addMeasurements(this.latestPollutionGridDataSource);
      this.pollutionWarningService.addMeasurements(this.measurementGridDataSource);
      this.pollutionWarningService.prepareData();
    })
  }

  private setLatestPollutionGrid(data) {
    this.resetLatestPollutionGrid();

    const latestPollution: LatestPollution =  data.results != null ? new LatestPollution(data.results[0]) : null;

    this.latestPollutionGridDataSource = this.gridService.getPollutionGridDataSource(latestPollution.measurements);
    this.latestPollutionGridColumns = this.gridService.getPollutionGridColumns(this.latestPollutionGridDataSource);
  }

  private setMeasurementGrid(data) {
    this.resetMeasurementGrid();

    const measurements: Measurement[] =  data.results != null
      ? data.results.map((result: any) => {
        return new Measurement(result);
      })
      : null;

    this.measurementGridDataSource = this.gridService.getPollutionGridDataSource(measurements);
    this.measurementGridGridColumns = this.gridService.getPollutionGridColumns(this.measurementGridDataSource);
  }

  private onCountrySelected(e: any): void {
    this.setCities(e.value);
  }

  private onCitySelected(e: any): void {
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
}
