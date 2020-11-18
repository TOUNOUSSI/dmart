import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Profile } from "src/app/models/profile.model";
import { AccountService } from "src/app/services/account/account.service";
import { ProfileService } from "src/app/services/profile/profile.service";

@Component({
  selector: "dmart-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public pseudoname: string;
  public loadedProfile: Profile;
  public isParentRendred: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.loadedProfile = new Profile();
    this.pseudoname = this.route.snapshot.params.pseudoname;

    this.profileService.getProfile(this.pseudoname).subscribe((response) => {
      this.loadedProfile = response;
      this.isParentRendred = true;
    });
  }
}
