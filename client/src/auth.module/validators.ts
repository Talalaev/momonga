import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CustomValidators {
    emitter: EventEmitter<string> = new EventEmitter(true);

    constructor(
        private http: Http
    ) {}

    regExpValidation(nameRe: RegExp) {
        return (control: AbstractControl): {[key: string]: any} => {
            const name = control.value;
            const no = nameRe.test(name);
            return no ? null : {'doesNotMatchRegEx': {name}};
        };
    }
    asyncLoginValidator() {
        return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
            return this.http
                .get(`is-login-taken?login=${control.value}`)
                .map(res => {
                    this.emitter.emit('login');

                    if (res.json().taken) {
                        return {taken: true};
                    }

                    return null;
                })
                .catch(error => {
                    this.emitter.emit('login');

                    return Observable.of({error: true});
                });
        };
    }
    passwordsValidator(): ValidatorFn {
        return (control: AbstractControl) => {
            return this._getPasswordsEqualError(this._isPasswordsEqual(control));
        }
    }

    private _isPasswordsEqual(controlsGroup:  AbstractControl): boolean {
        const password = controlsGroup.get('password');
        const repeatPassword = controlsGroup.get('repeatPassword');

        if (!repeatPassword.value) {
            return true;
        }
        if (!password.value) {
            return false;
        }

        return password.value === repeatPassword.value;
    }
    private _getPasswordsEqualError(noError: boolean): {} | null {
        if (noError) {
            return null;
        }

        return {
            passwordsnotequal: {
                control: 'repeatPassword'
            }
        };
    }
}