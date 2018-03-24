import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "../auth.module/auth.service";

const ru = require("../../locales/ru.json");
const en = require("../../locales/en.json");

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    param = {value: 'Mike'};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private authService: AuthService
    ) {
        translate.setDefaultLang('en');
        translate.use('ru');

        translate.setTranslation('en', en);
        translate.setTranslation('ru', ru);

        translate.onLangChange.subscribe((event: any) => {
            console.log(event);
        });
    }

    setEngLang() {
        this.translate.use('en');
    }

    ngOnInit() {
        console.log(this.router.routerState);
        console.log(this.router);
        console.log(this.route);
    }
}