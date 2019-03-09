import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './root/root.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { KeepRecordsComponent } from './keep-records/keep-records.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'keep-records',
    pathMatch: 'full'
  },
  {
    path: 'keep-records',
    component: KeepRecordsComponent,
    data: {
      title: 'Keep Records'
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'User Settings'
    }
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: {
      title: 'Reports'
    }
  }

  // {
  //   path: '',
  //   component: RootComponent,
  //   data: {
  //     title: 'Dojo'
  //   },
  //   children: [
  //     {
  //       path: 'keep-records',
  //       data: {
  //         title: 'Keep Records'
  //       },
  //     },
  //     {
  //       path: 'settings',
  //       component: SettingsComponent,
  //       data: {
  //         title: 'User Settings'
  //       },
  //     },
  //     {
  //       path: 'reports',
  //       component: ReportsComponent,
  //       data: {
  //         title: 'Reports'
  //       },
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DojoRoutingModule { }
