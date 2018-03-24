import { Component }   from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.module/auth.service';

import { Observable } from 'rxjs';

import { DojoService } from './dojo.service';
import { DojoActions } from '../store/actions/dojo.actions';

@Component({
    selector: "root",
    templateUrl: 'root.component.html'
})
export class RootComponent {
    isOpen: Observable<{}>;

    constructor(
        private dojoService: DojoService,
        private actions: DojoActions,
        public router: Router,
        public authService: AuthService
    ) {
        this.isOpen = dojoService.getState();
    }

    async logout() {
        this.authService.tryingToLogout();
        // let isLoggedIn = await this.authService.logout().toPromise();
        //
        // if (isLoggedIn) return;
        //
        // this.router.navigate(["/login"]);
    }
}