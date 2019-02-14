import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { NgxApiManager } from 'ngx-api-manager';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';

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
    TranslateModule.forChild(),
    PagesRoutingModule,
    NgxApiManager.forRoot({
      configs: [new ApiConfig('main')]
    }),
    ComponentsModule,
    CardModule,
    ButtonModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    RootOfPagesComponent
  ]
})
export class PagesModule { }
