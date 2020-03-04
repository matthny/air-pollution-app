import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

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
  @ViewChild('drawer', { static: true })
  private drawer: MatSidenav;
  private isHandset: boolean;

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
            this.isHandset = true;
          } else if (!isHandset) {
            this.isHandset = false;
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
          width: PopupComponent.getWidth(this.isHandset),
          height: PopupComponent.getHeight(this.isHandset),
          data: data
        });

        popupRef.componentInstance.createWikiParagraph();
      });
    }
}
