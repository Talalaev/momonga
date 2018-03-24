import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: "registration-container",
    template: `
        <ng-content></ng-content>
    `,
    exportAs: "registration-container"
})
export class RegistrationContainer {
    constructor(
        public authService: AuthService
    ) {}

    tryRegistration(user: User) {
        this.authService.tryingToRegistration(user);
    }
}