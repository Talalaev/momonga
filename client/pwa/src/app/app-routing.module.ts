import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RootOfPagesComponent } from './pages/root-of-pages/root-of-pages.component';
import { AuthGuard } from './shared/auth/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dojo',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    component: RootOfPagesComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dojo',
        loadChildren: './pages/dojo/dojo.module#DojoModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
