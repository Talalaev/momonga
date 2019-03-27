import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { MomentModule } from 'ngx-moment';

import { PipesModule } from '../pipes/pipes.module';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    CalendarModule,
    NgxMaskModule.forRoot(),
    MomentModule,
    PipesModule
  ],
  declarations: [
    MainMenuComponent,
    HeaderComponent,
    FooterComponent,
    PurchaseComponent,
    StatisticsComponent
  ],
  exports: [
    MainMenuComponent,
    HeaderComponent,
    FooterComponent,
    PurchaseComponent,
    StatisticsComponent
  ]
})
export class ComponentsModule { }
