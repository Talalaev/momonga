import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainMenuComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    MainMenuComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
