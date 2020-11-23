import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProfileService } from "src/app/services/profile/profile.service";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { MessengerService } from "src/app/services/messenger/messenger.service";
import { Profile } from "src/app/models/profile.model";
import { CookieService } from "ngx-cookie-service";

const rand = (max) => Math.floor(Math.random() * max);

@Component({
  selector: "dmart-profile-header",
  templateUrl: "./profile-header.component.html",
  styleUrls: ["./profile-header.component.scss"],
})
export class ProfileHeaderComponent implements OnInit {
  @Input("pseudoname")
  public pseudoname: string;

  @Input("loaded-profile")
  public loadedProfile: any;

  public profilePropertyToChange: string;
  constructor(
    private cookieService: CookieService,
    private messengerService: MessengerService,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private _sanitizer: DomSanitizer
  ) {}

  profileCoverImage: SafeResourceUrl;
  profileImageAvatar: SafeResourceUrl;
  imagePathBackup: SafeResourceUrl;

  fileToUpload: File;

  isSaveSideBarShown: boolean = true;
  isMyProfile: boolean = true;
  areWeAlreadyFriend: boolean = true;

  ngOnInit() {
    if (this.pseudoname !== this.cookieService.get("__psdnm_")) {
      this.isMyProfile = false;
    }
    this.messengerService.AreWeAlreadyFriend(this.pseudoname).then((resp) => {
      this.areWeAlreadyFriend = JSON.parse(JSON.stringify(resp));
      console.log("Are we friends : " + this.areWeAlreadyFriend);
    });
    if (
      this.loadedProfile.pictures !== undefined &&
      this.loadedProfile.pictures.length > 0
    ) {
      this.loadedProfile.pictures.forEach((picture) => {
        if (picture.pictureType === "COVER_PICTURE") {
          this.profileCoverImage = this._sanitizer.bypassSecurityTrustResourceUrl(
            "data:image/jpg;base64," + picture.data
          );
        } else {
          this.profileImageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
            "data:image/jpg;base64," + picture.data
          );
        }
      });
    } else {
      // In case there's no cover and no profile load the default GMART cover and default profile picture
      this.profileCoverImage = this._sanitizer.bypassSecurityTrustResourceUrl(
        "../../../../assets/img/profile/cover/default-cover.jpg"
      );

      this.profileImageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
        "../../../../assets/img/avatars/avatar-default.png"
      );
    }
    //Backing up the profile cover
    this.imagePathBackup = this.profileCoverImage;
  }

  /**
   * @todo apply this only on large screens and not on small devices (mobile)
   * @param event
   */
  @HostListener("window:scroll", ["$event"])
  scrollHandler(event) {
    let profile = document.getElementById(
      "profile-horizontal-list-menu"
    ) as HTMLDivElement;
    let profileBlurredBackground = document.getElementById(
      "profile-background-container"
    ) as HTMLDivElement;
    let timelineContainer = document.getElementById(
      "timeline-container"
    ) as HTMLDivElement;
    if (profile !== undefined) {
      console.log("applieeeeeeeeeeeeeeeeeeeeeeeeeeed = " + window.innerWidth);

      //if( window.pageYOffset>= 526.4000244140625){
      if (window.pageYOffset >= 526.4000244140625 && window.innerWidth > 414) {
        profile.classList.add("profile-horizontal-list-start-fixed");

        profileBlurredBackground.classList.add(
          "profile-background-container-fixed"
        );
        profileBlurredBackground.classList.remove(
          "profile-background-container"
        );

        timelineContainer.classList.add("timeline-container-scroll");
        timelineContainer.classList.remove("timeline-container");
      } else {
        profile.classList.remove("profile-horizontal-list-start-fixed");

        profileBlurredBackground.classList.remove(
          "profile-background-container-fixed"
        );
        profileBlurredBackground.classList.add("profile-background-container");

        timelineContainer.classList.remove("timeline-container-scroll");
        timelineContainer.classList.add("timeline-container");
      }
    }
  }

  onClickOpenImageChooseDialogue(event) {
    var input = document.getElementById("inputimage") as HTMLInputElement;
    input.click();
  }

  onClickOpenProfilePictureChooseDialogue(event) {
    var input = document.getElementById("avatarinputImage") as HTMLInputElement;
    input.click();
  }

  onCIChange(files: FileList) {
    this.profilePropertyToChange = "PROFILE_COVER";

    this.fileToUpload = files[0];
    console.log("Cover Image changed:" + files[0]);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.profileCoverImage = event.target.result;
    };
    reader.readAsDataURL(files[0]);

    this.switchSaveSideBarShown();
  }

  onPPChange(files: FileList) {
    this.profilePropertyToChange = "PROFILE_PICTURE";
    this.fileToUpload = files[0];
    console.log("Profile Picture changed:" + files[0]);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.profileImageAvatar = event.target.result;
    };
    reader.readAsDataURL(files[0]);

    this.switchSaveSideBarShown();
  }

  onUpload() {
    console.log("File name :" + this.fileToUpload.name);
    switch (this.profilePropertyToChange) {
      case "PROFILE_PICTURE": {
        this.profileService.updateProfilePicture(this.fileToUpload).subscribe(
          (res: any) => {
            if (res !== undefined) {
              this.profileImageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
                "data:image/jpg;base64," + res.data
              );
            }
          },
          (err) => {}
        );
        window.location.reload();

        break;
      }
      case "PROFILE_COVER": {
        this.profileService.updateProfileCover(this.fileToUpload).subscribe(
          (res: any) => {
            if (res !== undefined) {
              this.profileCoverImage = this._sanitizer.bypassSecurityTrustResourceUrl(
                "data:image/jpg;base64," + res.data
              );
            }
          },
          (err) => {}
        );
        break;
      }

      default:
        break;
    }

    var input = document.getElementById("inputimage") as HTMLInputElement;
    input.value = "";
    this.switchSaveSideBarShown();
  }

  onCancel() {
    this.profileCoverImage = this.imagePathBackup;

    console.log("onClose called");
    var input = document.getElementById("inputimage") as HTMLInputElement;
    input.value = "";
    this.switchSaveSideBarShown();
  }

  /**
   *
   */
  onAddNewFriendToFriendList() {
    console.log("adding '" + this.pseudoname + "' to friend list");
    this.messengerService.addFriend(this.pseudoname);
  }

  public switchSaveSideBarShown() {
    this.isSaveSideBarShown = !this.isSaveSideBarShown;
  }
}
