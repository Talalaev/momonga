import { Injectable }       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        // берем url той страницы с которой пришли
        let url: string = state.url;

        // сохраняем в переменную и отправляем на /login,  а после возвращаем обратно
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

    async canDeactivate() {
        console.log("canDeactivate");

        return true;
    }

    async checkLogin(url: string): Promise<boolean> {
        let isLoggedIn = await this.authService.verifyAuth().toPromise();

        if (isLoggedIn) {
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }
}







// import { Injectable }       from '@angular/core';
// import {
//     CanActivate, Router,
//     ActivatedRouteSnapshot,
//     RouterStateSnapshot,
//     CanActivateChild
// }                           from '@angular/router';
// import { AuthService }      from './auth.service';
//
// @Injectable()
// export class AuthGuard implements CanActivate, CanActivateChild {
//     constructor(
//         private authService: AuthService,
//         private router: Router
//     ) {}
//
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         let url: string = state.url;
//
//         return this.checkLogin(url);
//     }
//
//     canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//         return this.canActivate(route, state);
//     }
//
//     checkLogin(url: string): boolean {
//         return true;
//
//         if (this.authService.isLoggedIn) { return true; }
//
//         // Store the attempted URL for redirecting
//         this.authService.redirectUrl = url;
//
//         // Navigate to the login page with extras
//         this.router.navigate(['/login']);
//         return false;
//     }
// }