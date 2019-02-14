import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainMenuComponent,
    HeaderComponent
  ],
  exports: [
    MainMenuComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
