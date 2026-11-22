import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AktivitasComponent } from './aktivitas/aktivitas.component';
import { CustomerComponent } from './customer/customer.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AlatPendakianComponent } from './alat-pendakian/alat-pendakian.component';
import { authGuard } from './guards/auth.guard';
import { ReturnRecordsComponent } from './return-records/return-records.component';
import { RentalComponent } from './rental/rental.component';
import { TambahAlatComponent } from './alat-pendakian/tambah-alat/tambah-alat.component';
import { EditAlatComponent } from './alat-pendakian/edit-alat/edit-alat.component';
import { KategoriMerekComponent } from './kategori-merek/kategori-merek.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
                path: 'alatpendakian/tambah',
                component: TambahAlatComponent
            },
            {
                path: 'alatpendakian/edit/:id',
                component: EditAlatComponent
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
                path: 'kategori-merek',
                component: KategoriMerekComponent
            },
            {
                path: "**",
                component: NotFoundComponent
            }

        ]
    },

];
