import { LatestMeasurement } from '../models/latest-measurement';
import { LatestPollution } from '../models/latest-pollution';
import { IMeasurementObject } from '../models/utils/interfaces';


export class CommonHelper {
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

