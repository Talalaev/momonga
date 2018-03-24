import { Component, Input, Output, EventEmitter }   from '@angular/core';

import { Observable } from 'rxjs';

import { DojoService } from './dojo.service';
import { DojoActions } from '../store/actions/dojo.actions';

@Component({
    selector: "hello",
    templateUrl: 'hello.component.html'
})
export class HelloComponent {
    @Input()
    state: boolean;

    @Output()
    openDojo: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    closeDojo: EventEmitter<void> = new EventEmitter<void>();
}