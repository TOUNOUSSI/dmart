import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account/account.service";
import { AuthService } from "src/app/services/authentication/auth.service";
import { navItems } from "../../../_nav";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { ProfileService } from "src/app/services/profile/profile.service";
import { WebSocketAPI } from "src/app/websocket-api";
import { map, startWith } from "rxjs/operators";
import { FormControl, FormGroup } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { ClassToggler } from "../../core/shared/toggle-classes";
import { sidebarCssClasses } from "../classes";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"],
  providers: [ClassToggler],
})
export class DefaultLayoutComponent implements OnInit {
  theme: "red";
  name: string;

  public sidebarMinimized = true;
  public navItems = navItems;
  public matchingUsers: User[] = [];
  public search_id: string = "dmart-search-id";
  public pseudoname: string = "";
  public myProfile: any;
  myFormGroup: FormGroup;
  searchHistory: string[] = [];
  filteredOptions: Observable<string[]>;
  fromSearchHistory: string[] = new Array();

  public initNavItems: Array<any>;
  msgConfirmation: string = "Vous êtes déconnecté.";

  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public profileAvatar: SafeResourceUrl;

  constructor(
    private accountservice: AccountService,
    private authenticationService: AuthService,
    private cookieService: CookieService,
    private webSocketAPI: WebSocketAPI,
    private router: Router,
    private profileService: ProfileService,
    private _sanitizer: DomSanitizer,
    private classToggler: ClassToggler
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains(
        "sidebar-minimized"
      );
    });
    this.changes.observe(<Element>this.element, {
      attributes: true,
    });
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
    this.handleMessage();
  }

  handleMessage() {
    console.log("Message handled");
    console.log("response from observable here " + this.webSocketAPI.message);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public onSearchFriend(username: string) {
    if (username !== "") {
      this.accountservice.getSearchUsersList(username).subscribe((data) => {
        console.log("returned data here");
        console.log(data);
        this.matchingUsers = data;
      });
    } else {
      this.matchingUsers = [];
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.fromSearchHistory = this.searchHistory.filter((option) => {
      option.toLowerCase().includes(filterValue);
    });

    if (this.fromSearchHistory.length == 0) {
      this.accountservice
        .getAllAccounts()
        .toPromise()
        .then((users) => {
          alert(users);
        });
    } else {
      return this.fromSearchHistory;
    }
  }

  ngOnInit() {
    this.myFormGroup = new FormGroup({
      search: new FormControl(),
    });
    this.filteredOptions = this.myFormGroup.get("search").valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
    this.profileService.getMyProfile().subscribe((profile) => {
      this.myProfile = profile;
      console.log("Inside Default layout profile loading ... ");
      this.pseudoname = profile.pseudoname;
      if (profile.pictures !== undefined && profile.pictures.length > 0) {
        profile.pictures.forEach((picture) => {
          if (picture.pictureType === "PROFILE_PICTURE") {
            this.profileAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
              "data:image/jpg;base64," + picture.data
            );
          }
        });
      } else {
        // In case there's no cover load the default GMART cover
        this.profileAvatar = this._sanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/avatars/avatar-default.png"
        );
      }
    });
  }

  onOpenMyProfile(pseudoname) {
    this.router.navigateByUrl("/admin/profile/" + pseudoname);
  }
  doLogout() {
    if (confirm("Voulez vous vraiment vous déconnecter?")) {
      localStorage.clear();
      sessionStorage.clear();
      this.cookieService.deleteAll();
      this.authenticationService.logout();
      this.router.navigate(["/signin"]);
    }
  }

  openDatasourceDialog() {
    console.log("Open dialog called");
  }

  defaultTouch = { x: 0, y: 0, time: 0 };

  @HostListener("swiperight", ["$event"])
  public swipeRightHandler(event) {
    console.log("event " + event.type + " listener");
    document.querySelector("body").classList.add("sidebar-show");
    document.querySelector("body").classList.remove("aside-menu-show");
  }

  @HostListener("click", ["$event"])
  public clickHandler(event) {
    console.log("event " + event.type + " listener");
    document.querySelector("body").classList.remove("sidebar-show");
    document.querySelector("body").classList.remove("aside-menu-show");
  }

  @HostListener("swipeleft", ["$event"])
  public swipeLeftHandler(event) {
    console.log("event " + event.type + " listener");
    document.querySelector("body").classList.add("aside-menu-show");
    document.querySelector("body").classList.remove("sidebar-show");
  }
}
