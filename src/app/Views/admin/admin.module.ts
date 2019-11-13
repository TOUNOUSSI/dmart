import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    imports: [
    CommonModule,
        FormsModule,
        HttpClientModule,
        AdminRoutingModule
    ],
    
    declarations: [
     DashboardComponent,
    ],
        
    })
    
    export class AdminModule { }