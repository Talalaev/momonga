import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { PagesRoutingModule } from './pages-routing.module';
import { DojoModule } from './dojo/dojo.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RootOfPagesComponent } from './root-of-pages/root-of-pages.component';

// Services

// Other
import { ApiModule } from '../shared/api/index';
import { ApiConfig } from '../configs/api.config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    ApiModule.forRoot({
      configs: [new ApiConfig('main')]
    }),
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    RootOfPagesComponent
  ]
})
export class PagesModule { }
