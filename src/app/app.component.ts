import { Component } from '@angular/core';


import { OpenAQService } from './api/open-aq.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'air-app';



  constructor(private openAQService: OpenAQService) {

    this.openAQService.getCountries().subscribe((data) => {
      console.log(data);

    })
  }

}
