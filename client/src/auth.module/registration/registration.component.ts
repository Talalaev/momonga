import { Component, ViewChild, OnInit, EventEmitter, Output } from "@angular/core";
import {
    NgForm, ReactiveFormsModule, NgModel,
    AbstractControl, FormGroup, FormBuilder,
    Validators, FormControl, AsyncValidatorFn, Validator
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../validators';
import validationMessages from '../validationMessages';
import * as Uikit from "uikit";

@Component({
    selector: "registration-component",
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent implements OnInit {
    constructor(
        private authService: AuthService,
        public router: Router,
        private builder: FormBuilder,
        private customValidators: CustomValidators
    ) {}

    @Output()
    registration: EventEmitter<User> = new EventEmitter<User>();

    form: FormGroup;
    formState: RegistrationFormState = {
        login: false,
        email: false,
        password: false,
        repeatPassword: false
    };
    formErrors = {
        login: '',
        email: '',
        password: '',
        repeatPassword: ''
    };
    validationMessages = validationMessages;

    random: string = '1';
    onInput(message: string) {
        this.random = message;
    }

    ngOnInit() {
        this.buildForm();
        this.changeState();
        /**
         * Кастомный EventEmitter валидатора позволяет реагировать сразу после загрузки и валидации
         * формы не дожидаясь ввода пользователя
         * */
        this.customValidators.emitter.subscribe((val: string) => this.changeState());
    }

    onSubmit() {
        // console.log(this.form);
        // return;
        if (!this.form.valid) {
            Uikit.notification(
                `<span uk-icon="icon: bolt;"></span> Form invalid!`,
                {
                    status: 'warning',
                    pos: 'top-right'
                }
            );

            return;
        }

        this.registration.emit(this.form.value);
    }

    buildForm() {
        this.form = this.builder.group({
            // login: new FormControl('some value', Validators.required, this.asyncLoginValidator()),
            login: [
                'test', [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(16)
                ],
                this.customValidators.asyncLoginValidator()
            ],
            email: [
                'email@google.com', [
                    Validators.required,
                    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/)
                ]
            ],
            password: [
                '123456', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(24)
                ]
            ],
            repeatPassword: [
                '123456', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(24)
                ]
            ]
        });

        this.form.valueChanges.subscribe((d) => this.changeState());
        this.form.validator = this.customValidators.passwordsValidator();
        this.form.get('login').statusChanges.subscribe(val => this.changeState());
    }

    changeState() {
        this._setErrors();

        for (let inputName in this.formState) {
            if (this.formErrors[inputName]) {
                this.formState[inputName] = false;

                continue;
            }
            if (!this.form.get(inputName).dirty && this.form.get(inputName).value === '') {
                continue;
            }
            if (!this.form.get(inputName).valid) {
                continue;
            }

            this.formState[inputName] = true;
        }
    }

    private _setErrors(data?: any) {
        if (!this.form) {
            return;
        }

        const form = this.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + '; ';
                }
            }
        }

        /**
         * Проверим ошибки для всей формы и выведем ошибки для тех полей в которых они были.
         * */
        for (const field in form.errors) {
            if (form.dirty) {
                const control = form.errors[field].control;
                this.formErrors[control] += this.validationMessages[control][field] + '; ';
            }
        }
    }
}