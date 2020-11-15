import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AdminRoutingModule } from "./admin-routing.module";
import { ChatModule } from "../chat";
import { FriendsModule } from "../friends";
import { ProfileComponent } from "./profile/profile.component";
import { RouterModule } from "@angular/router";
import {
  MatCardModule,
  MatDialogModule,
  MatDialogContent,
} from "@angular/material";
import { ProfileHeaderComponent } from "./profile/profile-header/profile-header.component";
import { ProfileBodyComponent } from "./profile/profile-body/profile-body.component";
import { ProfileTimelineComponent } from "./profile/profile-timeline/profile-timeline.component";
import { NewPostModalComponent } from "./new-post-modal/new-post-modal.component";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { ProfileAvatarComponent } from './profile/profile-avatar/profile-avatar.component';
import { BsModalService } from 'ngx-bootstrap/modal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    RouterModule,
    MatDialogModule,
    MatCardModule,
    AngularMaterialModule,
  ],

  declarations: [
    DashboardComponent,
    ProfileComponent,
    ProfileAvatarComponent,
    ProfileHeaderComponent,
    ProfileBodyComponent,
    ProfileTimelineComponent,
    NewPostModalComponent,
  ],
  entryComponents: [NewPostModalComponent],
  providers: [BsModalService],
})
export class AdminModule {}
