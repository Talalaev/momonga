import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootOfPagesComponent } from './root-of-pages/root-of-pages.component';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NotFoundComponent } from "./not-found/not-found.component";


const routes: Routes = [
  {
    path: '',
    component: RootOfPagesComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
