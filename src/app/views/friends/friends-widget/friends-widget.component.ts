import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Subject } from "rxjs";
import { fadeIn, fadeInOut } from "../animations";
import { MessengerService } from "src/app/services/messenger/messenger.service";
import { ChatInjectorService } from "src/app/services/chat-injector/chat-injector.service";
import { ChatWidgetComponent } from "../../chat";
import { CookieService } from "ngx-cookie-service";
import { DmartCryptoService } from "src/app/services/dmart-cryptography/dmart-crypto.service";
import { GmartCookieService } from "src/app/services/gmart-cookie/gmart-cookie.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ProfileService } from "src/app/services/profile/profile.service";

const rand = (max) => Math.floor(Math.random() * max);

@Component({
  selector: "friends-widget",
  templateUrl: "./friends-widget.component.html",
  styleUrls: ["./friends-widget.component.scss"],
  animations: [fadeInOut, fadeIn],
})
export class FriendsWidgetComponent implements OnInit {
  @ViewChild("chatFirstWidget", { read: ViewContainerRef, static: false })
  firstChatWidget: ViewContainerRef;

  @ViewChild("bottom", null) bottom: ElementRef;
  @Input() public theme: "blue" | "grey" | "red" = "blue";

  friends: any = [{}];

  public _visible = false;

  public get visible() {
    return this._visible;
  }

  @Input() public set visible(visible) {
    this._visible = visible;
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom();
        this.focusMessage();
      }, 0);
    }
  }

  constructor(
    private cookieService: CookieService,
    private messengerService: MessengerService,
    private profileService: ProfileService,
    private chatInjectorService: ChatInjectorService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private gmartCookieService: GmartCookieService,
    private cryptoService: DmartCryptoService,
    private _sanitizer: DomSanitizer
  ) {}

  public focus = new Subject();
  public friendsWidget = {
    totalFriends: 0,
    status: "online",
  };

  public chatWidget: any = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    pseudoname: "",
  };

  public messages = [];

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  // public randomMessage() {
  //   this.addMessage(this.operator, getRandomMessage(), 'received')
  // }

  ngOnInit() {
    console.log("Loading friend list started ");

    this.messengerService.getFriends().then((res) => {
      this.friends = res;
      this.friendsWidget.totalFriends = this.friends.length;
    });
  }

  ngAfterViewInit() {
    console.log("After view checked called");
    this.reopenChatWidgets();
  }

  public toggleFriends() {
    this.visible = !this.visible;
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "/") {
      this.focusMessage();
    }
    if (event.key === "?" && !this._visible) {
      this.toggleFriends();
    }
  }

  reopenChatWidgets() {
    let chatCookies = this.gmartCookieService.getChatCookies();
    for (var i = 0; i < chatCookies.length; i++) {
      //decrypting the chatcookie to retrieve the profile
      let decrypted = this.cryptoService.decode(chatCookies[i]);
      if (decrypted !== undefined && decrypted !== "") {
        let profile = JSON.parse(decrypted);

        let canInject = this.chatInjectorService.canInjectChat(profile);
        if (canInject === true) {
          let _id = this.chatInjectorService.regenerateID(profile);
          setTimeout(() => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(
              ChatWidgetComponent
            );
            if (this.firstChatWidget !== undefined) {
              //Load user details from DB and
              this.profileService
                .getProfile(profile.pseudoname)
                .subscribe((profile) => {
                  if (
                    profile.pictures !== undefined &&
                    profile.pictures.length > 0
                  ) {
                    profile.pictures.forEach((picture) => {
                      if (picture.pictureType === "PROFILE_PICTURE") {
                        componentRef.instance.receiver.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
                          "data:image/jpg;base64," + picture.data
                        );
                      }
                    });
                  } else {
                    // In case there's no cover load the default GMART cover
                    componentRef.instance.receiver.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
                      "../../../../assets/img/avatars/avatar-default.png"
                    );
                  }
                });

              this.chatInjectorService._id = _id;
              let componentRef = this.firstChatWidget.createComponent(factory);
              componentRef.instance._id = _id;
              componentRef.instance.visible = true;
              //componentRef.instance.receiver.avatar = ;
              componentRef.instance.receiver.firstname = profile.firstname;
              componentRef.instance.receiver.lastname = profile.lastname;

              componentRef.instance.toUser = profile.username;
              componentRef.instance.messageRequest.receiver = profile.username;
              componentRef.instance.sender.name = profile.username;
              this.profileService
                .getProfile(this.cookieService.get("__psdnm_"))
                .subscribe((profile) => {
                  if (
                    profile.pictures !== undefined &&
                    profile.pictures.length > 0
                  ) {
                    profile.pictures.forEach((picture) => {
                      if (picture.pictureType === "PROFILE_PICTURE") {
                        console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAH ");
                        componentRef.instance.sender.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
                          "data:image/jpg;base64," + picture.data
                        );
                      }
                    });
                  } else {
                    // In case there's no cover load the default GMART cover
                    componentRef.instance.sender.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
                      "../../../../assets/img/avatars/avatar-default.png"
                    );
                  }
                });
            }
          }, 1000);
        }
      } else {
        /**
         * @todo to be handled in case we allow direct message to user not present in friend list
         */
        console.debug(
          "No friend matched matched the profile loaded from the cookie "
        );
      }
    }
  }

  /**
   * Handle the click action on a friend on the friend widgets to open a new discussion with
   * @param i
   */
  openNewChat(user: any) {
    this.chatWidget.id = user.id;
    this.chatWidget.email = user.email;
    this.chatWidget.firstname = user.firstname;
    this.chatWidget.lastname = user.lastname;
    this.chatWidget.username = user.username;
    this.chatWidget.pseudoname = user.profile.pseudoname;
    //console.log("user : " + JSON.stringify(user));

    let canInject = this.chatInjectorService.canInjectChat(this.chatWidget);

    if (canInject === true) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(
        ChatWidgetComponent
      );
      let componentRef = this.firstChatWidget.createComponent(factory);
      componentRef.instance.visible = true;
      componentRef.instance._id = this.chatInjectorService._id;
      componentRef.instance.chatWidgetDetails = this.chatWidget;
      //componentRef.instance.receiver.avatar =

      let filtredProfilePictures = user.profile.pictures.filter((picture) => {
        return picture.pictureType === "PROFILE_PICTURE";
      });
      if (
        filtredProfilePictures !== undefined &&
        filtredProfilePictures[0] !== undefined
      ) {
        componentRef.instance.receiver.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
          "data:image/jpg;base64," + filtredProfilePictures[0].data
        );
      } else {
        // In case there's no cover load the default GMART cover
        componentRef.instance.receiver.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
          "../../../../assets/img/avatars/avatar-default.png"
        );
      }
      componentRef.instance.receiver.firstname = this.chatWidget.firstname;
      componentRef.instance.receiver.lastname = this.chatWidget.lastname;
      componentRef.instance.toUser = this.chatWidget.username;
      componentRef.instance.sender.name = this.chatWidget.username;
      componentRef.instance.messageRequest.receiver = this.chatWidget.username;

      this.profileService
        .getProfile(this.cookieService.get("__psdnm_"))
        .subscribe((profile) => {
          if (profile.pictures !== undefined && profile.pictures.length > 0) {
            profile.pictures.forEach((picture) => {
              if (picture.pictureType === "PROFILE_PICTURE") {
                console.log("WAAAAAAAAAAAAAAAAAAAAAAAAAH ");
                componentRef.instance.sender.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
                  "data:image/jpg;base64," + picture.data
                );
              }
            });
          } else {
            // In case there's no cover load the default GMART cover
            componentRef.instance.sender.avatar = this._sanitizer.bypassSecurityTrustResourceUrl(
              "../../../../assets/img/avatars/avatar-default.png"
            );
          }
        });
    }
  }
}
