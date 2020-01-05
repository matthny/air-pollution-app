import { LatestMeasurement } from './latest-measurement';

export class LatestPollution {
    public location: string;
    public city: string;
    public countryCode: string;
    public measurements: LatestMeasurement[] = [];

    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.location = constructorObject.location;
            this.city = constructorObject.city;
            this.countryCode = constructorObject.country;
            this.measurements = constructorObject.measurements =! null 
                ? constructorObject.measurements.map((measurement: any) => new LatestMeasurement(measurement))
                : []
        } 

    }
}