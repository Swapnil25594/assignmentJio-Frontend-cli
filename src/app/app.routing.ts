import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/public/aotdashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/public/aotdashboard'
    }
]

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);