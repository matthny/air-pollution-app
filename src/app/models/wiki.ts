export class Wiki {

  public extractHTML: string;
  public extract: string;


  constructor(constructorObject: any) {
    this.fromJSON(constructorObject);
  }

  private fromJSON(constructorObject: any) {
    if (constructorObject != null) {
      this.extractHTML = constructorObject.extract_html;
      this.extract = constructorObject.extract;
    }
  }
}