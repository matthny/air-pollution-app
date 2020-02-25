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

  public getFormattedExtract(): string {
    while (this.extract.includes('NO2')
      || this.extract.includes('CO2')
      || this.extract.includes('O3')
      || this.extract.includes('O2')
      || this.extract.includes('SO2')
      || this.extract.includes('C2v')
    ) {
      this.extract = this.extract.replace('NO2', 'NO<sub>2</sub>');
      this.extract = this.extract.replace('CO2', 'CO<sub>2</sub>');
      this.extract = this.extract.replace('O3', 'O<sub>3</sub>');
      this.extract = this.extract.replace('O2', 'O<sub>2</sub>');
      this.extract = this.extract.replace('SO2', 'SO<sub>2</sub>');
      this.extract = this.extract.replace('C2v', 'C<sub>2v</sub>');
    }

    return this.extract;
  }
}
