export class Wiki {

  public extractHTML: string;

  constructor(constructorObject: any) {
    this.fromJSON(constructorObject);
  }

  private fromJSON(constructorObject: any) {
    if (constructorObject != null) {
      this.extractHTML = constructorObject.extract_html;
    }
  }

  

}