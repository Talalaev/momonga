import { Component, ViewChild, OnInit, EventEmitter, Input, Output } from "@angular/core";
import {
    NgForm, ReactiveFormsModule, NgModel,
    AbstractControl, FormGroup, FormBuilder,
    Validators, FormControl, AsyncValidatorFn, Validator
} from "@angular/forms";

@Component({
    selector: "example-two-way-binding",
    template: `
        <p>
            {{ random }}
        </p>
        <button
            (click)="onClick()"
            class="uk-button uk-button-primary">
            Emit value
        </button>
    `
})
export class ExampleTwoWayBinding {
    @Input()
    random: string;

    @Output()
    randomChange: EventEmitter<string> = new EventEmitter<string>();

    onClick() {
        this.randomChange.emit(String(Math.random()));
    }
}