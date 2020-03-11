import { Component } from '@angular/core';


import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);

    const savedLang: string = localStorage.getItem('airAppLang');
    const browserLang: string = translate.getBrowserLang();

    if (savedLang != null) {
      translate.use(savedLang.match('en') || savedLang.match('pl') ? savedLang : 'en');
    } else {
      translate.use(browserLang.match('en') || browserLang.match('pl') ? browserLang : 'en');
    }
  }
}
