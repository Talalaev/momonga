import { Component }   from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: "login-container",
    template: `
        <ng-content></ng-content>
    `,
    exportAs: "login-container"
})
export class LoginContainer {
    constructor(
        public authService: AuthService
    ) {}

    login(user: User) {
        this.authService.tryingToLogin(user);

        /**
         * Пример использования обычного сервиса вместо ngrx и ngeffects (redux)
         * @example
         * this.authService
         *      .login(this.model.user)
         *      .subscribe((res) => {
         *          this.setMessage();
         *          console.log("RES: ", res);
         *          if (this.authService.isLoggedIn) {
         *              // Get the redirect URL from our auth service
         *              // If no redirect has been set, use the default
         *              let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dojo';
         *              // Redirect the user
         *              this.router.navigate([redirect]);
         *          }
         *      });
         * */
    }
}