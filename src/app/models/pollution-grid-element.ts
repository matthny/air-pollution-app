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

    country: string;
    city: string;

    public getLocaleDateTime() {
        return this.date != null
            ? this.date.toLocaleString([], {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})
            : null;
    }
}
