import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RootOfPagesComponent } from './root-of-pages/root-of-pages.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    RootOfPagesComponent
  ]
})
export class PagesModule { }
