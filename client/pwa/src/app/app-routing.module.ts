import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from './libs/auth/auth-guard.service'

import { RootOfPagesComponent } from './pages/root-of-pages/root-of-pages.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   canDeactivate: [AuthGuard],
  //   component: RootOfPagesComponent,
  //   data: {
  //     title: 'Home'
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  //     },
  //     {
  //       path: 'settings',
  //       loadChildren: './pages/settings/settings.module#SettingsModule'
  //     },
  //     // {
  //     //   path: 'admin',
  //     //   loadChildren: './pages/admin/admin.module#AdminModule'
  //     // },
  //     {
  //       path: 'customers',
  //       loadChildren: './pages/customers/customers.module#CustomersModule'
  //     },
  //     // {
  //     //   path: 'express',
  //     //   loadChildren: './pages/express-avia/express-avia.module#ExpressAviaModule'
  //     // },
  //     // {
  //     //   path: 'finances',
  //     //   loadChildren: './pages/finances/finances.module#FinancesModule'
  //     // },
  //     {
  //       path: 'network',
  //       loadChildren: './pages/network/network.module#NetworkModule'
  //     },
  //     // {
  //     //   path: 'reports',
  //     //   loadChildren: './reports/reports.module#ReportsModule'
  //     // },
  //   ]
  // }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
