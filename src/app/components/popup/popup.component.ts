import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Parameter } from 'src/app/helpers/common-helper';
import { Wiki } from 'src/app/models/wiki';

export interface PopupData {
  wiki: Wiki;
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

  private wikihtml: string = this.data.wiki.extractHTML;
}
