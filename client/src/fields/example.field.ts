import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'example-field',
    template: `
        <button (click)="increment()">+</button>
            {{ counterValue }}
        <button (click)="decrement()">-</button>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ExampleField),
            multi: true
        }
    ]
})
export class ExampleField implements ControlValueAccessor {
    @Input()
    counterValue: string;

    writeValue(value: any) {
        if (value !== undefined) {
            this.counterValue = value;
        }
    }
    propagateChange: (_: any) => void;

    registerOnChange(fn: any) {
        this.propagateChange = fn;
        // this.propagateChange = (newValue) => {
        //     // if (this.control) {
        //     //     this.control.setValue(newValue, {emitEvent: true});
        //     // }
        //
        //     fn(newValue);
        // };
    }
    registerOnTouched(fn: any) {}

    increment() {
        // this.counterValue += 1;
        this.propagateChange(this.counterValue + 1);
    }

    decrement() {
        // this.counterValue += 0;
        this.propagateChange(this.counterValue + 0);
    }
}