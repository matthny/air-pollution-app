export class City {
    public city: string;
    public countryCode: string;


    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    public static alphabeticalComparator(first: City, second: City): number {
        let a = first.city.toLowerCase();
        let b = second.city.toLowerCase();
        
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
            this.city = constructorObject.city;
            this.countryCode = constructorObject.countryCode;
        } 

    }
}