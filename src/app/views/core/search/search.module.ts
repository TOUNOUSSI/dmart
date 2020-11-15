import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '../shared/layout/layout.module';
import { SearchComponent } from './search.component';
import { FriendsModule } from '../../friends';
import { AdminModule } from '../../admin/admin.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FriendsModule,
    AdminModule
  
  ],
  exports: [
    SearchComponent,
    LayoutModule
    ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule {}
