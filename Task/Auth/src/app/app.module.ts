import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
// import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { APP_ROUTES } from './app.routes';
import { DashboardModule } from './dashboard/dashboard.module';
// import { FusionChartsModule } from 'angular-fusioncharts';
// import * as FusionCharts from 'fusioncharts';
// import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// FusionChartsModule.fcRoot(FusionCharts, Widgets, FusionTheme);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    HttpModule,
    //FusionChartsModule,
    RouterModule.forRoot(APP_ROUTES),
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }