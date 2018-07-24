import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { IOTInterestComponent } from './components/iot-interest.component';


const appRoutes: Routes = [
    {
        path: 'public', canActivateChild: [],

        children: [
            { path: '', redirectTo: 'aotdashboard', pathMatch: 'full' },
            { path: 'aotdashboard', component: IOTInterestComponent },
        ]

    },
];

export const IOTRouting: ModuleWithProviders = RouterModule.forChild(appRoutes);
