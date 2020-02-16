import { Component, Inject } from '@angular/core';
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

  private wiki: string = this.data.wiki.extractHTML;

  constructor(
    public popupRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData) {}

  onNoClick(): void {
    this.popupRef.close();
  }


  public createDiv() {
    let newDiv: HTMLBodyElement = document.createElement("body");
    newDiv.innerHTML = this.wiki;
  
    //let myDiv: Node = document.getElementsByTagName('title');
    document.body = newDiv;

  }




}
