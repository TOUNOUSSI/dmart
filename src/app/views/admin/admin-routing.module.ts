import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: {
      title: "Admin Dashboard",
    },
  },
  {
    path: "profile/:pseudoname",
    component: ProfileComponent,
    data: {
      title: "Gmart profile",
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
