import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { LoginWrapperComponent } from "../auth.module/login/login-wrapper.component";
import { RegistrationWrapperComponent } from "../auth.module/registration/registration-wrapper.component";
import { NotFoundComponent } from "../404.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dojo',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginWrapperComponent
    },
    {
        path: 'registration',
        component: RegistrationWrapperComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}