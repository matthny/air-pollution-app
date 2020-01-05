export interface IMeasurementObject {
    getDate(): Date;
    getParameter(): string;
    getUnit(): string;
    getValue(decimalDigits: number): number;
}