import { IMeasurementObject } from './utils/interfaces';

export class LatestMeasurement implements IMeasurementObject {
    public parameter: string;
    public value: number;
    public unit: string;
    public lastUpdated: Date;

    constructor(constructorObject: any) {
        this.fromJSON(constructorObject);
    }

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.parameter = constructorObject.parameter;
            this.value = constructorObject.value;
            this.unit = constructorObject.unit;
            this.lastUpdated = new Date(constructorObject.lastUpdated);
        }
    }

    public getDate(): Date {
        return this.lastUpdated;
    }

    public getParameter(): string {
        return this.parameter;
    }

    public getUnit(): string {
        return this.unit;
    }

    public getValue(decimalDigits: number): string {
        return this.value != null ? this.value.toFixed(decimalDigits) : null;
    }
}
