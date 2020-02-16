import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WikiResponse, Parameter } from '../helpers/common-helper';

@Injectable({
  providedIn: 'root'
})
export class WikiService {

  private apiUrl: string = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

  constructor(private httpClient: HttpClient) { }

  public getWiki(parameter: Parameter): Observable<WikiResponse> {
    return this.httpClient.get<WikiResponse>(`${this.apiUrl}${this.getParameterPostfix(parameter)}`);
  }

  private getParameterPostfix(parameter: Parameter) {
    let parameterPostfix: string;

    if (parameter === Parameter.bc) {
      parameterPostfix = 'Black_carbon';
    }

    if (parameter === Parameter.co) {
      parameterPostfix = 'Carbon_dioxide';
    }

    if (parameter === Parameter.no2) {
      parameterPostfix = 'Nitrogen_dioxide';
    }

    if (parameter === Parameter.o3) {
      parameterPostfix = 'Ozone';
    }

    if (parameter === Parameter.pm10) {
      parameterPostfix = 'Particulates';
    }

    if (parameter === Parameter.pm25) {
      parameterPostfix = 'Particulates';
    }

    if (parameter === Parameter.so2) {
      parameterPostfix = 'Sulfur_dioxide';
    }
    return parameterPostfix;
  }

}
