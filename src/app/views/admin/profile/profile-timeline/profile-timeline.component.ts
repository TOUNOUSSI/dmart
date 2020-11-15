import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  TemplateRef,
  ComponentFactoryResolver,
  ViewChild,
} from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NewPostModalComponent } from "../../new-post-modal/new-post-modal.component";
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: "dmart-profile-timeline",
  templateUrl: "./profile-timeline.component.html",
  styleUrls: ["./profile-timeline.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileTimelineComponent implements OnInit {
  @Input("profile")
  public loadedProfile: any;
  modalRef: BsModalRef;
  @ViewChild("templateref", { static: false })
  public templateref: TemplateRef<any>;

  profileImageAvatar: SafeResourceUrl;

  constructor(
    private _sanitizer: DomSanitizer,
    private modalService: BsModalService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (
      this.loadedProfile.pictures !== undefined &&
      this.loadedProfile.pictures.length > 0
    ) {
      this.loadedProfile.pictures.forEach((picture) => {
        if (picture.pictureType === "PROFILE_PICTURE") {
          this.profileImageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
            "data:image/jpg;base64," + picture.data
          );
        }
      });
    } else {
      this.profileImageAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
        "../../../../assets/img/avatars/avatar-default.png"
      );
    }
  }

  openDialog(): void {
    console.log("The dialog was closed");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "760px";
    const dialogRef = this.dialog.open(NewPostModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}
