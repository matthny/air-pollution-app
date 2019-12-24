import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { OpenAQService } from '../api/open-aq.service';
import { OpenAQResponse } from '../models/open-aq-response';
import { CommonHelper} from '../helpers/common-helper';

import { Country } from '../models/country';
import { City } from '../models/city';
import { Location } from '../models/location';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})

export class MainComponent implements OnInit {
  ngOnInit() {
    this.initialize()
  }

  private countries: Country[] = [];
  private cities: City[] = [];
  private locations: Location[] = [];


  constructor(
      private openAQService: OpenAQService
    ) {
  }

  private initialize(): void {

    this.setCountries();

  }

  private setCountries(): void {
    this.openAQService.getCountries().subscribe((data: OpenAQResponse) => {
      this.countries = data.results
        .map(result => new Country(result))
        .filter(result => result.name != null)
        .sort(Country.alphabeticalComparator)
    })
  }

  private setCities(countryCode: string): void {
    this.openAQService.getCities(countryCode).subscribe((data: OpenAQResponse) => {
      this.cities = data.results
        .map(result => new City(result))
        .filter(result => result.city != null)
        .sort(City.alphabeticalComparator)
    })
  }

  private setLocations(city: string): void {
    this.openAQService.getLocations(city).subscribe((data: OpenAQResponse) => {
      this.locations = data.results
        .map(result => new Location(result))
        .filter(result => result.sourceName != null)
        .sort(Location.alphabeticalComparator)
    })
  }

  private onCountrySelected(e: any): void {
    this.setCities(e.value);
  }

  private onCitySelected(e: any): void {
    this.setLocations(e.value);
  }
}
