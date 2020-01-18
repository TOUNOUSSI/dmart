import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'friends-config',
  template: `
    <div class="friends-config">
      {{text}}
      <button *ngFor="let item of themes"
              class="btn" [class.btn-active]="item === theme"
              (click)="setTheme(item)">
        {{item}}
      </button>
    </div>
  `,
  styles: [`
    .friends-config {
      padding: 20px;
    }
    .btn {
      padding: 5px;
      margin: 0px 2px;
      border: 1px solid #dedede;
      outline: none;
    }
    .btn-active {
      border: 1px solid #a0a0a0;
    }
    .btn:focus {
      border: 1px solid #333;
    }
  `],
})
export class FriendsConfigComponent {
  @Input() public theme: string
  @Input() public text = 'Select theme'
  @Output() public themeChange: EventEmitter<any> = new EventEmitter()

  public themes = ['blue', 'grey', 'red']
  public setTheme(theme) {
    this.theme = theme
    this.themeChange.emit(this.theme)
  }
}
