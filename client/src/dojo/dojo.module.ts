import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from "../auth.module";

import { DojoRoutingModule } from '../routing/dojo-routing.module';
import { RootComponent } from './root.component';
import { DojoComponent } from './dojo.component';
import { HelloComponent } from './hello.component';
import { DojoService } from './dojo.service';
import { DojoActions } from '../store/actions/dojo.actions';


@NgModule({
    imports: [
        CommonModule,
        AuthModule,
        DojoRoutingModule
    ],
    declarations: [
        RootComponent,
        DojoComponent,
        HelloComponent
    ],
    providers: [
        DojoService,
        DojoActions
    ]
})
export class DojoModule {}