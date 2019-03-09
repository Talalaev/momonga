import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { DojoRoutingModule } from './dojo-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { RootComponent } from './root/root.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { KeepRecordsComponent } from './keep-records/keep-records.component';


@NgModule({
  imports: [
    CommonModule,
    DojoRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  declarations: [
    RootComponent,
    SettingsComponent,
    ReportsComponent,
    KeepRecordsComponent
  ]
})
export class DojoModule { }
