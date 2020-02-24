import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { MatSidenav, MatDialog, MatDialogRef } from '@angular/material';

import { PopupComponent, PopupData } from '../popup/popup.component';
import { Parameter, WikiResponse } from 'src/app/helpers/common-helper';
import { WikiService } from 'src/app/api/wiki.service';
import { Wiki } from 'src/app/models/wiki';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @ViewChild('drawer')
  private drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public popup: MatDialog,
    private wikiService: WikiService
  ) {}

    private handleClick(): void {
      this.isHandset$
        .pipe(first())
        .subscribe((isHandset: boolean) => {
          if (isHandset) {
            this.drawer.close();
          }
        });
    }

    public openPopup(parameter: Parameter): void {
      let popupRef: MatDialogRef<PopupComponent, any>;

      this.wikiService.getWiki(parameter).toPromise().then((result: WikiResponse) => {
        const data: PopupData = {
          wiki: new Wiki(result),
          title: PopupComponent.getTitle(parameter)
        };

        popupRef = this.popup.open(PopupComponent, {
          width: '100vw',
          height: '100vh',
          data: data
        });

        popupRef.componentInstance.createDiv();
      });

    }
}
