import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LayoutComponent } from './layout/layout.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';
import { ChartModule } from 'angular-highcharts';
import { AlarmsComponent } from './alarms/alarms.component';
//import { AngularFireDatabase } from '@angular/fire/database';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    ChartModule //AngularFireDatabase
  ],
  providers: [
    AuthGuard,
    RoleGuard
  ],
  declarations: [HomeComponent, AdminComponent, LayoutComponent, AlarmsComponent]
})
export class DashboardModule { }