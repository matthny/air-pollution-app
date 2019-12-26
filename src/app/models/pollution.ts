import { Measurement } from './measurement';

export class Pollution {
    public location: string;
    public city: string;
    public countryCode: string;
    public measurements: Measurement[] = [];

    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.location = constructorObject.location;
            this.city = constructorObject.city;
            this.countryCode = constructorObject.country;
            this.measurements = constructorObject.measurements =! null 
                ? constructorObject.measurements.map((measurement: any) => new Measurement(measurement))
                : []
        } 

    }
}