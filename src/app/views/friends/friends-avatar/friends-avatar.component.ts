import { Component, Input } from '@angular/core'

@Component({
  selector: 'friends-avatar',
  template: `
    <img [attr.src]="image" class="avatar" />
  `,
  styles: [`
    .avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
    }
  `]
})
export class FriendsAvatarComponent {
  @Input() public image: string
}
