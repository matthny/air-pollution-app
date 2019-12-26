import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';


import { OpenAQService } from '../api/open-aq.service';
import { OpenAQResponse } from '../models/open-aq-response';
import { CommonHelper} from '../helpers/common-helper';

import { Country } from '../models/country';
import { City } from '../models/city';
import { Location } from '../models/location';
import { Pollution } from '../models/pollution';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {
  ngOnInit() {
    this.initialize()
  }

  public pollutionForm: FormGroup;

  private countries: Country[] = [];
  private cities: City[] = [];
  private locations: Location[] = [];
  private latestPollution: Pollution;



  constructor(
      private openAQService: OpenAQService
    ) {
  }

  private initialize(): void {

    this.setCountries();
    this.setPollutionForm();


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

  // private setLatestPollution(e): void {
  //   this.openAQService.getLatestPollution(this.pollutionForm.value.location).subscribe((data: OpenAQResponse) => {
  //     this.latestPollution =  data.results != null ? new Pollution(data.results) : null;
  //   })
  // }
  private setLatestPollution(): void {
    this.openAQService.getLatestPollution(this.pollutionForm.value.location).subscribe((data: OpenAQResponse) => {
      this.latestPollution =  data.results != null ? new Pollution(data.results[0]) : null;
      console.log(this.latestPollution);
    
    })
  }

  
  private onCountrySelected(e: any): void {
    this.setCities(e.value);
  }

  private onCitySelected(e: any): void {
    this.setLocations(e.value);
  }
}
