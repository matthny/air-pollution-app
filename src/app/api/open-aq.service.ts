import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenAQResponse } from '../models/open-aq-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenAQService {

  constructor(private httpClient: HttpClient) { 
    
  }

  public getCountries(): Observable<OpenAQResponse> {
    return this.httpClient.get<OpenAQResponse>('https://api.openaq.org/v1/countries');
  }

  
  public getCities(countryCode: string): Observable<OpenAQResponse> {
    return this.httpClient.get<OpenAQResponse>('https://api.openaq.org/v1/cities?country=' + countryCode +'&limit=' + 1000);
  }

  public getLocations(city: string): Observable<OpenAQResponse> {
    return this.httpClient.get<OpenAQResponse>('https://api.openaq.org/v1/locations?city=' + city +'&limit=' + 1000);
  }

}
