import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { rootReducer } from './store/rootReducer';

import { AppRoutingModule } from "./routing/app-routing.module";

import { DojoModule } from "./dojo/dojo.module";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./404.component";
import { ServerErrorComponent } from "./server-error.component/server-error.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        StoreModule.provideStore(rootReducer),
        // EffectsModule.runAfterBootstrap(CounterEffects),
        TranslateModule.forRoot(),
        DojoModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        ServerErrorComponent
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }