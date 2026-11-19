import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AktivitasComponent } from './aktivitas/aktivitas.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomerComponent } from './customer/customer.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AlatPendakianComponent } from './alat-pendakian/alat-pendakian.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: LayoutComponent,
        // canActivate: [authGuard],
        children: [
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: 'aktivitas',
                component: AktivitasComponent
            },
            {
                path: "customer",
                component: CustomerComponent
            },
            {
                path: 'alatpendakian',
                component: AlatPendakianComponent
            },
            {
                path: "**",
                component: NotFoundComponent
            }

        ]
    },

];
