import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  ElementRef,
} from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthService } from "./services/authentication/auth.service";
import { AccountService } from "./services/account/account.service";
import { UrlPermission } from "./services/url-permission/url.permission";
import { AuthGuard } from "./services/url-permission/auth.guard";
import { AnonymousGuardService } from "./services/url-permission/anonymous-auth.guard";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { STEPPER_GLOBAL_OPTIONS, CdkStepper } from "@angular/cdk/stepper";
import { XhrInterceptor } from "./services/security/xhr.interceptor";
import { SnackbarService } from "./services/notifications/toaster/snackbar.service";
import { AngularMaterialModule } from "./angular-material.module";
import { DefaultLayoutComponent } from "./views/containers";
import { AppFooterModule } from "./views/core/footer";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CommonModule } from "@angular/common";
import { TabsModule } from "ngx-bootstrap/tabs";
import { AppAsideModule } from "./views/core/aside";
import { AppHeaderModule } from "./views/core/header";
import { AppBreadcrumbModule } from "./views/core/breadcrumb";
import { AppSidebarModule } from "./views/core/sidebar";
import { WebSocketAPI } from "./websocket-api";
import { FriendsModule } from "./views/friends";
import { RegistrationComponent } from "./views/registration/registration.component";
import { SplashscreenComponent } from "./views/splashscreen/splashscreen.component";
import { LoginComponent } from "./views/login/login.component";
import { SearchModule } from "./views/core/search";
import { CookieService } from "ngx-cookie-service";
import { DmartCryptoService } from "./services/dmart-cryptography/dmart-crypto.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DefaultLayoutComponent,
    SplashscreenComponent,
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
    FriendsModule,
    SearchModule,
  ],
  entryComponents: [],

  providers: [
    CookieService,
    DmartCryptoService,
    WebSocketAPI,
    AuthService,
    AccountService,
    UrlPermission,
    AuthGuard,
    AnonymousGuardService,
    SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
