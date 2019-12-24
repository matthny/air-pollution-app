export class Country {
    public code: string;
    public name: string;


    constructor(constructorObject: any) {
        this.fromJSON(constructorObject)
    }

    public static alphabeticalComparator(first: Country, second: Country): number {
        let a = first.name.toLowerCase();
        let b = second.name.toLowerCase();
        
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
            this.code = constructorObject.code;
            this.name = constructorObject.name;
        } 

    }
}