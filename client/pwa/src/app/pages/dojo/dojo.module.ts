import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { DojoRoutingModule } from './dojo-routing.module';
import { RootComponent } from './root/root.component';


@NgModule({
  imports: [
    CommonModule,
    DojoRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [RootComponent]
})
export class DojoModule { }
