import { Component }   from '@angular/core';
import { Observable } from 'rxjs';

import { DojoService } from './dojo.service';
import { DojoActions } from '../store/actions/dojo.actions';

@Component({
    selector: "dojo",
    templateUrl: 'dojo.component.html'
})
export class DojoComponent {
    isOpen: Observable<{}>;
    user: Observable<{}>;

    constructor(
        private dojoService: DojoService,
        private  actions: DojoActions
    ) {
        this.isOpen = dojoService.getState();
        this.user = dojoService.getUser();
    }
}