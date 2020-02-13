import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Parameter } from 'src/app/helpers/common-helper';

export interface PopupData {
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
    @Inject(MAT_DIALOG_DATA) public data: PopupData) {}

  onNoClick(): void {
    this.popupRef.close();
  }
}
