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
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private wikiService: WikiService,
    private translate: TranslateService,
    private snackBar: MatSnackBar
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

      this.wikiService.getWiki(parameter).toPromise()
        .then((result: WikiResponse) => {
          const data: PopupData = {
            wiki: new Wiki(result),
            parameter: parameter
          };

          popupRef = this.popup.open(PopupComponent, {
            width: PopupComponent.getWidth(this.isHandset),
            height: PopupComponent.getHeight(this.isHandset),
            data: data
          });

          popupRef.componentInstance.createWikiParagraph();
          popupRef.componentInstance.createTitle();
        })
        .catch(() => {
          this.snackBar.open(this.translate.instant('error'), this.translate.instant('errorAction'), {duration: 4000});
        });
    }

    private setPL() {
      this.translate.use('pl');
      localStorage.setItem('airAppLang', 'pl');
    }

    private setEN() {
      this.translate.use('en');
      localStorage.setItem('airAppLang', 'en');
    }
}
