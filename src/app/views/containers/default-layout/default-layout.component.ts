import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AnonymousGuardService } from "src/app/services/url-permission/anonymous-auth.guard";
import { AccountService } from "src/app/services/account/account.service";
import { AuthService } from "src/app/services/authentication/auth.service";
import { navItems } from "../../../_nav";
import { Observable } from "rxjs";
import { User } from "src/app/models/user.model";
import { ProfileComponent } from "../../admin/profile/profile.component";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { ProfileService } from "src/app/services/profile/profile.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { WebSocketAPI } from 'src/app/websocket-api';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"],
})
export class DefaultLayoutComponent implements OnInit {
 
 
  theme: 'red';
  name: string;


  public sidebarMinimized = true;
  public navItems = navItems;
  public matchingUsers: User[] = [];

  public pseudoname: string = "";
  public myProfile: any;
  myFormGroup: FormGroup;
  searchHistory: string[] = [];
  filteredOptions: Observable<string[]>;
  fromSearchHistory: string[] =new Array();

  public initNavItems: Array<any>;
  msgConfirmation: string = "Vous êtes déconnecté.";

  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public profileAvatar: SafeResourceUrl;


  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name)
    this.handleMessage();
  }

  handleMessage(){
    console.log("Message handled")
    console.log("response from observable here "+  this.webSocketAPI.message)
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

  constructor(
    private accountservice: AccountService,
    private webSocketAPI : WebSocketAPI,
    private router: Router,
    private profileService: ProfileService,
    private _sanitizer: DomSanitizer
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.fromSearchHistory = this.searchHistory.filter(option => {
      option.toLowerCase().includes(filterValue)
    });

    if(this.fromSearchHistory.length ==0 ){
      this.accountservice.getAllAccounts().toPromise().then(
       users => {
         alert(users)
       });
    }else{
      return this.fromSearchHistory;
    }
  }

  ngOnInit() {
    this.myFormGroup = new FormGroup({
      search: new FormControl()
    });
    this.filteredOptions = this.myFormGroup.get('search').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
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
          "data:image/jpg;" + "../../../../assets/img/avatars/6.jpg"
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
      this.accountservice.logout();
      this.router.navigate(["/signin"]);
    }
  }

  openDatasourceDialog() {
    console.log("Open dialog called");
  }
}
