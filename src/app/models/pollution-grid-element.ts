import { IMeasurementObject } from './utils/interfaces';

export class PollutionGridElement {
    date: Date;
    bc: IMeasurementObject;
    co: IMeasurementObject;
    no2: IMeasurementObject;
    o3: IMeasurementObject;
    pm10: IMeasurementObject;
    pm25: IMeasurementObject;
    so2: IMeasurementObject;
}
