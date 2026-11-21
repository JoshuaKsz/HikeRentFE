import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AktivitasComponent } from './aktivitas/aktivitas.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomerComponent } from './customer/customer.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AlatPendakianComponent } from './alat-pendakian/alat-pendakian.component';
import { authGuard } from './guards/auth.guard';
import { ReturnRecordsComponent } from './return-records/return-records.component';
import { RentalComponent } from './rental/rental.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: LayoutComponent,
        canActivate: [authGuard],
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
                path: 'pengembalian',
                component: ReturnRecordsComponent
            },
            {
                path: 'rental',
                component: RentalComponent
            },
            {
                path: "**",
                component: NotFoundComponent
            }

        ]
    },

];
