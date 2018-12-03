import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { NgxApiManager } from 'ngx-api-manager';
import { PagesRoutingModule } from './pages-routing.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RootOfPagesComponent } from './root-of-pages/root-of-pages.component';

// Services

// Other
import { ApiConfig } from '../configs/api.config';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    NgxApiManager.forRoot({
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
