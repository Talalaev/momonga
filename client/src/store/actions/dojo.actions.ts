import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { createAction } from '../createAction';
import { AppState } from '../appState';
import C from '../constants';

@Injectable()
export class DojoActions {
    constructor(private store: Store<AppState>) {}

    open() {
        this.store.dispatch(createAction(C.OPEN_DOJO));
    }
    close() {
        this.store.dispatch(createAction(C.CLOSE_DOJO));
    }
}