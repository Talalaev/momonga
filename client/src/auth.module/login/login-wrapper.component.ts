import { Component }   from '@angular/core';

@Component({
    selector: "login-wrapper",
    template: `
        <login-container #loginCont="login-container">
            <login-component (login)="loginCont.login($event)"></login-component>
        </login-container>
    `
})
export class LoginWrapperComponent {
}