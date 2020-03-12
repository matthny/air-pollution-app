export class Wiki {

  public extractHTML: string;
  public extract: string;
  public desktopUrl: string;

  constructor(constructorObject: any) {
    this.fromJSON(constructorObject);
  }

  private fromJSON(constructorObject: any) {
    if (constructorObject != null) {
      this.extractHTML = constructorObject.extract_html;
      this.extract = constructorObject.extract;
      this.desktopUrl = constructorObject.content_urls.desktop.page;
    }
  }
}
