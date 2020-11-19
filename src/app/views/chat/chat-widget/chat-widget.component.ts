import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Subject } from "rxjs";
import { fadeIn, fadeInOut } from "../animations";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { AppComponent } from "src/app/app.component";
import { CookieService } from "ngx-cookie-service";
import { ChatInjectorService } from "src/app/services/chat-injector/chat-injector.service";

const rand = (max) => Math.floor(Math.random() * max);

@Component({
  selector: "chat-widget",
  templateUrl: "./chat-widget.component.html",
  styleUrls: ["./chat-widget.component.scss"],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  private stompClient;
  private receivedMessage: string = "";
  public _id: string = "";
  elRef: ElementRef;
  @ViewChild("bottom", null) bottom: ElementRef;
  @Input() public theme: "blue" | "grey" | "red" = "blue";

  @Input()
  public friend = {
    name: "",
    status: "",
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  };

  //Store chat details here
  public chatWidgetDetails: any = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    pseudoname: "",
    avatar: {},
  };

  toUser: string = "";
  fromUser: string = localStorage.getItem("Currentuser");
  topic: string = "";

  public message: any;

  messageRequest: any = {
    type: "CHAT",
    sender: this.fromUser,
    content: "",
    receiver: this.toUser,
  };
  public _visible = false;

  constructor(
    private cookieService: CookieService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.initializeWebSocketConnection();
  }

  getHtmlContent() {
    //This will return '<p> Text </p>' as a string
    return this.elRef.nativeElement.innerHTML;
  }
  ngOnInit() {
    setTimeout(() => (this.visible = true), 800);
    //this.sender.avatar =
  }

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

  public focus = new Subject();

  public receiver = {
    firstname: "firstname",
    lastname: "lastname",
    status: "online",
    username: "",
    avatar: {},
  };

  public sender = {
    name: "Sender",
    status: "online",
    avatar: {},
  };

  public messages = [];

  public addMessage(from, text, type: "received" | "sent") {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    });
    this.scrollToBottom();
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  public focusMessage() {
    this.focus.next(true);
  }

  public closeChat() {
    console.log("close chat called id:" + this._id);
    this.cookieService.delete(this._id);
    var element = document.getElementById("chat-container-" + this._id);
    element.parentNode.removeChild(element);
  }

  public toggleChat() {
    this.visible = !this.visible;
    let firstElement = document.getElementById("chat-container-" + this._id);
    firstElement.parentElement.classList.toggle(
      "chat-container-toggled-layout"
    );
    firstElement.classList.toggle("chat-container-toggled-layout");
  }

  public sendMessage({ message }) {
    if (message.trim() === "") {
      return;
    }
    this.messageRequest.content = message;
    this.stompClient.send(
      "/ws/send/message",
      {},
      JSON.stringify(this.messageRequest)
    );
    this.addMessage(this.sender, message, "sent");
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "/") {
      this.focusMessage();
    }
    if (event.key === "?" && !this._visible) {
      this.toggleChat();
    }
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(AppComponent.CHAT_API_WEBSOCKETS_URL);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame) => {
      //console.log(this.stompClient._transport.url);
      this.topic = "/topic/public-" + this.fromUser + "-" + this.toUser;
      that.stompClient.subscribe(this.topic, (message) => {
        if (message.body) {
          console.log("Message received : " + JSON.parse(message.body));
          setTimeout(
            () =>
              this.addMessage(
                this.receiver,
                JSON.parse(message.body).content,
                "received"
              ),
            1000
          );
        }
      });
    });
  }

  getReceivedMessage(): string {
    return this.receivedMessage;
  }
}
