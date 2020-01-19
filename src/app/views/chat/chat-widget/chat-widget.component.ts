import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


const rand = max => Math.floor(Math.random() * max)

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  private stompClient;
  private serverUrl = 'http://gmart-ws-chat.herokuapp.com/kafkka/api'
  private receivedMessage: string = '';
  @ViewChild('bottom', null) bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'


  MessageRequest: any = {
    fromUser:  'Youssef' ,
    content: '',
    toUser: 'GoldenUser' 
  }
  public _visible = false

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

  constructor() {
    this.initializeWebSocketConnection();
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

  // public randomMessage() {
  //   this.addMessage(this.operator, getRandomMessage(), 'received')
  // }

  ngOnInit() {
    setTimeout(() => this.visible = true, 1000)
    setTimeout(() => {
      this.addMessage(this.operator, 'Hi, how can we help you?', 'received')
    }, 1500)
  }

  public toggleChat() {
    this.visible = !this.visible
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    this.MessageRequest.content = message
    this.stompClient.send("/app/send/message", {}, JSON.stringify(this.MessageRequest));
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
      that.stompClient.subscribe("/topic/public", (message) => {
        if (message.body) {
          console.log("Message received : " + message.body)
          setTimeout(() => this.addMessage(this.operator, message.body, 'received')
            , 1000)
        }
      })
    })
  }

  getReceivedMessage(): string {
    return this.receivedMessage
  }

}
