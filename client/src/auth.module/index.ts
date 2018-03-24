import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from "./login/login.component";
import { LoginContainer } from "./login/login.container";
import { LoginWrapperComponent } from "./login/login-wrapper.component";
import { LogoutComponent } from "./logout/logout.component";
import { LogoutContainer } from "./logout/logout.container";
import { RegistrationComponent } from "./registration/registration.component";
import { RegistrationContainer } from "./registration/registration.container";
import { RegistrationWrapperComponent } from "./registration/registration-wrapper.component";
import { ExampleField } from "../fields/example.field";

import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";

import { AuthActions } from "../store/actions/auth.actions";
import { AuthEffects } from "./auth.effects";

import { CustomValidators } from "./validators";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.runAfterBootstrap(AuthEffects)
    ],
    declarations: [
        LoginComponent,
        LoginContainer,
        LoginWrapperComponent,
        LogoutComponent,
        LogoutContainer,
        RegistrationComponent,
        RegistrationContainer,
        RegistrationWrapperComponent,
        ExampleField
    ],
    exports: [
        LoginComponent,
        LoginContainer,
        LoginWrapperComponent,
        LogoutComponent,
        LogoutContainer,
        RegistrationComponent,
        RegistrationContainer,
        RegistrationWrapperComponent
    ],
    providers: [
        AuthGuard,
        AuthService,
        AuthActions,
        CustomValidators
    ]
})
export class AuthModule {}