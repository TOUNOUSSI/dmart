import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { ChatModule } from '../chat';
import { FriendsModule } from '../friends';
@NgModule({
    imports: [
    CommonModule,
        FormsModule,
        HttpClientModule,
        AdminRoutingModule,
        ChatModule,
        FriendsModule
    ],

    declarations: [
     DashboardComponent,
    ],
    entryComponents:[]
        
    })
    
    export class AdminModule { }