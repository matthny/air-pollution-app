import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Parameter } from 'src/app/helpers/common-helper';

export interface PopupData {
  title: string;
  parameter: Parameter;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent {

  constructor(
    public popupRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) {}

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

  // TODO: probably not needed
  onNoClick(): void {
    this.popupRef.close();
  }
}
