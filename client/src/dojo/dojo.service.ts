import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/appState';

@Injectable()
export class DojoService {
    constructor(private store: Store<AppState>) {}

    getState(): Observable<{}> {
        return this.store.select('dojoState');
    }

    getUser(): Observable<{}> {
        return this.store.select('user');
    }
}