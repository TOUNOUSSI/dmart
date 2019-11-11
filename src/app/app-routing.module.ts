import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { RegistrationComponent } from './views/registration/registration.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'signin', component: LoginComponent },
    { path: 'signup', component: RegistrationComponent },
    { path: 'dashboard', component: DashboardComponent }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  // tslint:disable-next-line: eofline
  export class AppRoutingModule { }