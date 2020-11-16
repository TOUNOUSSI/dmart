import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '../shared/layout/layout.module';
import { SearchComponent } from './search.component';
import { FriendsModule } from '../../friends';
import { AdminModule } from '../../admin/admin.module';
import { FriendsAvatarComponent } from '../../friends/friends-avatar/friends-avatar.component';
import { SearchAvatarComponent } from './search-avatar/search-avatar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FriendsModule,
    AdminModule,
  
  ],
  exports: [
    SearchComponent,
    LayoutModule,
    SearchAvatarComponent
    ],
  declarations: [
    SearchComponent,
    SearchAvatarComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchModule {}
