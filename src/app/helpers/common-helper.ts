import { LatestMeasurement } from '../models/latest-measurement';
import { LatestPollution } from '../models/latest-pollution';
import { IMeasurementObject } from '../models/utils/interfaces';


export class CommonHelper {
}

export interface OpenAQResponse {
    meta: any;
    results: any[];
}
