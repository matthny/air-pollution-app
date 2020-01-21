import { LatestMeasurement } from '../models/latest-measurement';
import { LatestPollution } from '../models/latest-pollution';
import { IMeasurementObject } from '../models/utils/interfaces';


export class CommonHelper {
  public static getDistinctDates(dates: Date[]): Date[] {
    return dates
      .map((date: Date) => date.getTime())
      .filter((date: number, i: number, array: number[]) => {
          return array.indexOf(date) === i;
      })
      .map((time: number) => new Date(time));
  }
}

export interface OpenAQResponse {
    meta: any;
    results: any[];
}

export enum Parameter {
  co = 'co',
  no2 = 'no2',
  o3 = 'o3',
  pm10 = 'pm10',
  pm25 = 'pm25',
  so2 = 'so2',
  bc = 'bc'
}

