import { Component }   from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: "logout-container",
    template: `
        <ng-content></ng-content>
    `,
    exportAs: "logout-container"
})
export class LogoutContainer {
    constructor(
        public authService: AuthService
    ) {}

    logout() {
        /*
        * использует ngrx и ngeffects (redux)
        * */
        this.authService.tryingToLogout();

        /**
         * Выходим из учетной записи используя обычный сервис (без redux)
         * пример для es7 синтаксиса async/await
         *
         * @example
         * let isLoggedIn = await this.authService.logout().toPromise();
         * if (isLoggedIn) return;
         * this.router.navigate(["/login"]);
         * */
    }
}