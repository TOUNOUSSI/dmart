import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';
import { ChatModule } from '../chat';
import { FriendsModule } from '../friends';
import { ChatInjectorService } from 'src/app/services/chat-injector/chat-injector.service';
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
    ,providers:[ChatInjectorService]
        
    })
    
    export class AdminModule { }