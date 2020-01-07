import { IMeasurementObject } from './utils/interfaces';

export class Measurement implements IMeasurementObject {
    public parameter: string;
    public value: number;
    public unit: string;
    public date: Date;

    constructor(constructorObject: any) {
        this.fromJSON(constructorObject);
    }

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.parameter = constructorObject.parameter;
            this.value = constructorObject.value;
            this.unit = constructorObject.unit;
            this.date = constructorObject.date != null ? new Date(constructorObject.date.utc) : null;
        }
    }

    public getDate(): Date {
        return this.date;
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
