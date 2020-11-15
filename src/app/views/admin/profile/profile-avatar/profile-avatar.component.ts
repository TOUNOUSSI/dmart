import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'profile-avatar',
  templateUrl: "./profile-avatar.component.html",
  styleUrls: ["./profile-avatar.component.scss"]
})
export class ProfileAvatarComponent implements OnInit, AfterViewInit {


  @Input() public image: string
  @Input("styles") public styles: string[]
  @Input("id") public id: string
  @Output() public avatarCssChange: EventEmitter<any> = new EventEmitter()

  constructor(){

  }
  ngOnInit(): void {  }
  ngAfterViewInit(): void {

    if (this.styles !== undefined && this.styles.length !== 0) {
      let   imageElem = document.getElementById(this.id)as HTMLImageElement;

      this.styles.forEach(element => {
          imageElem.classList.remove("avatar");
          imageElem.classList.add(element);
          this.avatarCssChange.emit(element);
      });
    }
  }

}
