import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "profile-avatar",
  templateUrl: "./profile-avatar.component.html",
  styleUrls: ["./profile-avatar.component.scss"],
})
export class ProfileAvatarComponent implements OnInit {
  @Input() public image: string;
  @Input("styles") public styles: string[];
  @Input("id") public id: string;
  @Output() public avatarCssChange: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}
}
