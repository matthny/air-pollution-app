export class LatestMeasurement {
    public parameter: string;
    public value: number;
    public unit: string;
    public lastUpdated: Date;

    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.parameter = constructorObject.parameter;
            this.value = constructorObject.value;
            this.unit = constructorObject.unit;
            this.lastUpdated = new Date(constructorObject.lastUpdated);
        } 

    }

    
}