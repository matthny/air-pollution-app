import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Parameter } from 'src/app/helpers/common-helper';
import { Wiki } from 'src/app/models/wiki';

export interface PopupData {
  wiki: Wiki;
  title: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent {

  constructor(
    public popupRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData) {}

  private wiki: string = this.data.wiki.extractHTML;

  public static getTitle(parameter): string {
    if (parameter === Parameter.pm10) {
      return 'Particulates';
    } else if (parameter === Parameter.pm25) {
      return 'Particulates';
    } else if (parameter === Parameter.o3) {
      return 'Ozone';
    } else if (parameter === Parameter.bc) {
      return 'Black carbon';
    } else if (parameter === Parameter.co) {
      return 'Carbon monoxide';
    } else if (parameter === Parameter.no2) {
      return 'Nitrogen dioxide';
    } else if (parameter === Parameter.so2) {
      return 'Sulfur dioxide';
    }
  }



  public static getWidth(isHandset: boolean): string {
    return isHandset ? '90vw' : '60vw';
  }

  public static getHeight(isHandset: boolean): string {
    return isHandset ? '95vh' : '60vh';
  }

  public CreateWikiParagraph() {
    document.getElementById('created-wiki-text').innerHTML = this.wiki;
  }



}
