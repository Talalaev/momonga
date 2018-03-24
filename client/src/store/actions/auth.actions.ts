import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../createAction';
import { AppState } from '../appState';
import C from '../constants';

@Injectable()
export class AuthActions {
    constructor(
        private store: Store<AppState>
    ) {}

    login(payload: any) {
        this.store.dispatch(createAction(C.LOGIN, payload));
    }
    logout() {
        this.store.dispatch(createAction(C.LOGOUT));
    }
    tryingToLogin(payload: any) {
        this.store.dispatch(createAction(C.TRYING_TO_LOGIN, payload));
    }
    tryingToLogout() {
        this.store.dispatch(createAction(C.TRYING_TO_LOGOUT));
    }
    tryingToRegistration(payload: any) {
        this.store.dispatch(createAction(C.TRYING_TO_REGISTRATION, payload))
    }
}