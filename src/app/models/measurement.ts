export class Measurement {
    public parameter: string;
    public value: number;
    public unit: string;

    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.parameter = constructorObject.parameter;
            this.value = constructorObject.value;
            this.unit = constructorObject.unit;
        } 

    }
}