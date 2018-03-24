import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { RootComponent } from '../dojo/root.component';
import { DojoComponent } from "../dojo/dojo.component";

import { AuthGuard } from "../auth.module/auth-guard.service";

const routes: Routes = [
    {
        path: 'dojo',
        canActivate: [AuthGuard],
        canDeactivate: [AuthGuard],
        // компонент для общего контента все дочерних компонентов, например, для менюшки
        component: RootComponent,
        children: [
            {
                path: '',
                // canActivateChild: [AuthGuard],
                children: [
                    {
                        path: '',
                        component: DojoComponent,
                    }
                    // {
                    //     path: 'user',
                    //     component: UserComponent
                    // }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DojoRoutingModule {}