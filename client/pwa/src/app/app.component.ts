import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from "@angular/service-worker";
import { TranslateService } from '@ngx-translate/core';

import ru from "../locales/ru";
import en from "../locales/en";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  param: {[key: string]: any} = {
    value: 'Momo'
  };

  constructor(
    private swUpdate: SwUpdate,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('ru');

    translate.setTranslation('en', en);
    translate.setTranslation('ru', ru);

    translate.onLangChange.subscribe((event: any) => {
      console.log(event);
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }
}

