export interface IMeasurementObject {
    getDate(): Date;
    getParameter(): string;
    getUnit(): string;
    getStringValue(decimalDigits: number): string;
    getValue(): number;
}
