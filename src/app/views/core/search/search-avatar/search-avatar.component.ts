import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { element } from "protractor";

@Component({
  selector: "search-avatar",
  templateUrl: "./search-avatar.component.html",
  styleUrls: ["./search-avatar.component.scss"],
})
export class SearchAvatarComponent implements OnInit, AfterViewInit {
  public searchAvatar: SafeResourceUrl;

  @Input("pictures") public pictures: any[];
  @Input("styles") public styles: string[];
  @Input("id") public id: string;
  @Output() public avatarCssChange: EventEmitter<any> = new EventEmitter();

  constructor(private _sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    let filtredProfilePictures = this.pictures.filter((picture) => {
      return picture.pictureType === "PROFILE_PICTURE";
    });
    if (
      filtredProfilePictures !== undefined &&
      filtredProfilePictures[0] !== undefined
    ) {
      this.searchAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
        "data:image/jpg;base64," + filtredProfilePictures[0].data
      );
    } else {
      // In case there's no cover load the default GMART cover
      this.searchAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
        "../../../../assets/img/avatars/avatar-default.png"
      );
    }
  }
  ngAfterViewInit(): void {
    if (this.styles !== undefined && this.styles.length !== 0) {
      let imageElem = document.getElementById(this.id) as HTMLImageElement;
      this.styles.forEach((element) => {
        imageElem.classList.remove("avatar");
        imageElem.classList.add(element);
        this.avatarCssChange.emit(element);
      });
    }
  }
}
