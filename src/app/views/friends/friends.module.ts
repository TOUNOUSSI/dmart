import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FriendsAvatarComponent } from './friends-avatar/friends-avatar.component'
import { FriendsWidgetComponent } from './friends-widget/friends-widget.component'
import { FriendsInputComponent } from './friends-input/friends-input.component'
import { FriendsConfigComponent } from './friends-config/friends-config.component'
import { ChatModule, ChatWidgetComponent } from '../chat'

@NgModule({
  imports: [CommonModule,ChatModule],
  declarations: [FriendsAvatarComponent, FriendsWidgetComponent, FriendsInputComponent, FriendsConfigComponent],
  exports: [FriendsWidgetComponent, FriendsConfigComponent],
  entryComponents: [FriendsWidgetComponent, FriendsConfigComponent,ChatWidgetComponent],
})
export class FriendsModule {}
