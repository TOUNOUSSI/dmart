import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


const rand = max => Math.floor(Math.random() * max)

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  private stompClient;
  private _id:string='';
  private serverUrl = 'http://localhost:9091/gmart-chat-ws/gmart-chat-ws'
  private receivedMessage: string = '';
  elRef: ElementRef;
  @ViewChild('bottom', null) bottom: ElementRef;
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue';

  @Input()
  public friend = {
    name: '',
    status: '',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }

  toUser :string = ''; ;
  fromUser:string = localStorage.getItem('Currentuser');
  topic: string = ''

  public message :any;

MessageRequest: any = {
  type: "CHAT",
  sender:  this.fromUser ,
  content: '',
  receiver: this.toUser
}
public _visible = false

  constructor() {
    this._id = this.generateId(12);
    sessionStorage.setItem('chat-id', this._id)
    this.initializeWebSocketConnection();
  }      

  getHtmlContent() {
    //This will return '<p> Text </p>' as a string
    return this.elRef.nativeElement.innerHTML;
  }
  ngOnInit() {
    setTimeout(() => this.visible = true, 1000)
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, how can we help you?', 'received')
    }, 1500)
  }

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }


  public focus = new Subject()

  public operator = {
    name: 'Operator',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  public messages = []

  public addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

 public closeChat(){
 console.log('close chat called')
  var element = document.getElementById(this._id);
  element.parentNode.removeChild(element);

 }
  public toggleChat() {
    this.visible = !this.visible
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    this.MessageRequest.content = message
    this.stompClient.send("/ws/send/message", {}, JSON.stringify(this.MessageRequest));
    this.addMessage(this.client, message, 'sent')

  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({  }, (frame) => {
      //console.log(this.stompClient._transport.url); 
      this.topic = "/topic/public-"+this.fromUser+"-"+this.toUser;
      that.stompClient.subscribe(this.topic, (message) => {
       
        if (message.body) {
          console.log("Message received : " + JSON.parse(message.body))
          setTimeout(() => this.addMessage(this.operator,  JSON.parse(message.body).content, 'received')
            , 1000)
        }
      })
    })
  }

  getReceivedMessage(): string {
    return this.receivedMessage
  }


   generateId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 
}
