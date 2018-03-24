import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { AppState } from "../store/appState";

@Component({
    selector: "server-error",
    template: `
        <div class="server-error" *ngIf="error.status">
            <div>Status: {{ error.status }}</div> 
            <div *ngFor="let msg of error.msgs">Message: {{ msg }}</div>
        </div>
    `,
    styles: [`
        .server-error {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 100;
        }
    `]
})
export class ServerErrorComponent {
    error: ServerError = {
        status: null,
        msgs: []
    };

    constructor(
        private _store: Store<AppState>
    ) {
        this._store.select('serverError')
            .subscribe((val: ServerError) => {
                this.error = {...val};
            });
    }
}
