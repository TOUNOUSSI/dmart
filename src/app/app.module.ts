import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, ElementRef } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { AppComponent } from './app.component';
import { LoginComponent } from './Views/login/login.component';
import { SplashscreenComponent } from './views/splashscreen/splashscreen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { AuthService } from './services/authentication/auth.service';
import { AccountService } from './services/account/account.service';
import { UrlPermission } from './services/url-permission/url.permission';
import { AuthGuard } from './services/url-permission/auth.guard';
import { AnonymousGuardService } from './services/url-permission/anonymous-auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './views/registration/registration.component';
import {  PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { STEPPER_GLOBAL_OPTIONS, CdkStepper } from '@angular/cdk/stepper';
import { XhrInterceptor } from './services/security/xhr.interceptor';
import { SnackbarService } from './services/notifications/toaster/snackbar.service';
import { AngularMaterialModule } from './angular-material.module';
import { DefaultLayoutComponent } from './views/containers';
import { AppFooterModule } from './views/core/footer';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppAsideModule } from './views/core/aside';
import { AppHeaderModule } from './views/core/header';
import { AppBreadcrumbModule } from './views/core/breadcrumb';
import { AppSidebarModule } from './views/core/sidebar';
import { DatasourceComponent } from './views/datasource/config/ds-config/ds-config.component';
import { MatStepperNext, MatStepperPrevious, MatRipple } from '@angular/material';
import { WebSocketAPI } from './websocket-api';
import { ChatModule } from './views/chat';
import { FriendsModule } from './views/friends';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashscreenComponent,
    RegistrationComponent,
    DefaultLayoutComponent,
    DatasourceComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AngularMaterialModule,
    AppFooterModule,
    AppAsideModule,
    AppHeaderModule,
    AppBreadcrumbModule,
    AppSidebarModule,
    FriendsModule
  ],
  entryComponents: [DatasourceComponent],

  providers: [WebSocketAPI, AuthService, AccountService, UrlPermission, AuthGuard, AnonymousGuardService, SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
