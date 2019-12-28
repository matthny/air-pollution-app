import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';


import { OpenAQService } from '../api/open-aq.service';
import { OpenAQResponse } from '../helpers/common-helper';

import { pollutionGridElement } from '../helpers/common-helper';


import { CommonHelper} from '../helpers/common-helper';

import { Country } from '../models/country';
import { City } from '../models/city';
import { Location } from '../models/location';
import { LatestPollution } from '../models/latest-pollution';
import { LatestMeasurement } from '../models/latest-measurement';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})



export class MainComponent implements OnInit {
  ngOnInit() {
    this.initialize()
  }


  private countries: Country[] = [];
  private cities: City[] = [];
  private locations: Location[] = [];

  public pollutionForm: FormGroup;

  private latestPollutionGridDataSource: pollutionGridElement[] = [];
  private latestPollutionGridColumns: any[] = [];



  constructor(
      private openAQService: OpenAQService
    ) {
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

    })
  }

  private setCountries(): void {
    this.openAQService.getCountries().subscribe((data: OpenAQResponse) => {
      if (data.results != null) {
        this.countries = data.results
          .map(result => new Country(result))
          .filter(result => result.name != null)
          .sort(Country.alphabeticalComparator)
      } else {
        this.countries = [];
      }
    })
  }

  private setCities(countryCode: string): void {
    this.openAQService.getCities(countryCode).subscribe((data: OpenAQResponse) => {
      if (data.results != null) {
        this.cities = data.results
          .map(result => new City(result))
          .filter(result => result.city != null)
          .sort(City.alphabeticalComparator)
      } else {
        this.cities = [];
      }
    })
  }

  private setLocations(city: string): void {
    this.openAQService.getLocations(city).subscribe((data: OpenAQResponse) => {
      if (data.results != null) {
        this.locations = data.results
          .map(result => new Location(result))
          .filter(result => result.sourceName != null)
          .sort(Location.alphabeticalComparator)
      } else {
        this.locations = [];
      }
    })
  }
  
  private setLatestPollution(): void {
    this.setLatestPollutionGrid();
  }

  private setLatestPollutionGrid(): void {
    this.resetLatestPollutionGrid();

    this.openAQService.getLatestPollution(this.pollutionForm.value.location).subscribe((data: OpenAQResponse) => {
      const latestPollution: LatestPollution =  data.results != null ? new LatestPollution(data.results[0]) : null;

      this.latestPollutionGridDataSource = CommonHelper.getLatestPollutionGridDataSource(latestPollution.measurements);
      this.latestPollutionGridColumns = CommonHelper.getLatestPollutionGridColumns(this.latestPollutionGridDataSource);
    })
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
}
