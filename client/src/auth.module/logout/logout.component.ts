import { Component, Output, EventEmitter }   from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as Uikit from "uikit";

@Component({
    selector: "logout-component",
    templateUrl: 'logout.component.html'
})
export class LogoutComponent {
    constructor(
        public authService: AuthService,
        public router: Router
    ) {

    }
    @Output()
    logout: EventEmitter<void> = new EventEmitter<void>();
}