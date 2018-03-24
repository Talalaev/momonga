import { Component }   from '@angular/core';

@Component({
    selector: "registration-wrapper",
    template: `
        <registration-container #regCont="registration-container">
            <registration-component (registration)="regCont.tryRegistration($event)"></registration-component>
        </registration-container>
    `
})
export class RegistrationWrapperComponent {}