export class Location {
    public sourceName: string;
    public countryCode: string;
    public city: string;
    public location: string;


    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    public static alphabeticalComparator(first: Location, second: Location): number {
        let a = first.sourceName.toLowerCase();
        let b = second.sourceName.toLowerCase();
        
        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    }

    private fromJSON(constructorObject: any) {
        if (constructorObject != null) {
            this.sourceName = constructorObject.sourceName;
            this.countryCode = constructorObject.countryCode;
            this.city = constructorObject.city;
            this.location = constructorObject.location;
        } 

    }
}