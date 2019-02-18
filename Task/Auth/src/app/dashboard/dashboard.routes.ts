import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AlarmsComponent } from './alarms/alarms.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';

export const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'alarms', component: AlarmsComponent },
            { path: 'home', component: LayoutComponent }
        ]
    }
];