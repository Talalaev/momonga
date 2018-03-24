import {Component, ViewChild, EventEmitter, Output}   from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as Uikit from "uikit";

@Component({
    selector: "login-component",
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    constructor(
        public authService: AuthService,
        public router: Router
    ) {}

    model: { user: User } = {
        user: {
            email: null,
            password: null
        }
    };
    loginForm: NgForm;
    email: NgModel;
    password: NgModel;

    @ViewChild('loginForm')
    currentForm: NgForm;

    @ViewChild('email')
    userEmail: NgModel;

    @ViewChild('password')
    userPassword: NgModel;

    @Output()
    login: EventEmitter<User> = new EventEmitter<User>();

    onSubmit() {
        if (this.currentForm.invalid) {
            Uikit.notification(
                `<span uk-icon="icon: bolt;"></span> Form invalid!`,
                {
                    status: 'warning',
                    pos: 'top-right'
                }
            );

            return;
        }

        this.login.emit(this.model.user);
    }
}