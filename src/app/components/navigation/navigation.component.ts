import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { MatSidenav, MatDialog } from '@angular/material';

import { PopupComponent, PopupData } from '../popup/popup.component';
import { Parameter } from 'src/app/helpers/common-helper';



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
    public popup: MatDialog
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
      const data: PopupData = {parameter: parameter};

      const popupRef = this.popup.open(PopupComponent, {
        width: '100vw',
        height: '100vh',
        minWidth: '100vw',
        data: data
      });

      popupRef.afterClosed().subscribe(result => {

      });
    }
}
