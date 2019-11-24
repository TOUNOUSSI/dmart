import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { RegistrationComponent } from './views/registration/registration.component';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './views/containers';
import { UrlPermission } from './services/url-permission/url.permission';
import { AnonymousGuardService } from './services/url-permission/anonymous-auth.guard';
import { AuthGuard } from './services/url-permission/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  {
    path: 'signin',
    component: LoginComponent,
    children: [
      {
        path: '',
        component: DefaultLayoutComponent,
      }
    ]
  },
  {
    path: 'signup',
    component: RegistrationComponent

  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: './views/admin/admin.module#AdminModule',
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

// tslint:disable-next-line: eofline
export class AppRoutingModule { }