import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from "./pages/pages.module";
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AuthGuard } from './shared/auth/auth-guard.service';
import { AuthService } from './shared/auth/auth.service';
import { AuthState } from './shared/auth/store/auth.state';
import { CategoryState } from './components/purchase/store/category.state';
import { PurchaseState } from './components/purchase/store/purchase.state';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot(),
    NgxsModule.forRoot([
      AuthState,
      CategoryState,
      PurchaseState
    ]),
    AppRoutingModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
