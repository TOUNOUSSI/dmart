import { Component, ComponentFactoryResolver, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { ChatInjectorService } from 'src/app/services/chat-injector/chat-injector.service';
import { ChatWidgetComponent } from '../../chat';
import { User } from 'src/app/models/user.model';

const rand = max => Math.floor(Math.random() * max)

@Component({
  selector: 'friends-widget',
  templateUrl: './friends-widget.component.html',
  styleUrls: ['./friends-widget.component.scss'],
  animations: [fadeInOut, fadeIn],
})
export class FriendsWidgetComponent implements OnInit {
  @ViewChild('chatFirstWidget', { read: ViewContainerRef, static: false }) firstChatWidget: ViewContainerRef;

  @ViewChild('bottom', null) bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'

  friends:any;

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

  constructor(private messengerService:MessengerService, private chatInjectorService:ChatInjectorService,private componentFactoryResolver: ComponentFactoryResolver) {
  }

  public focus = new Subject()
  public friendsWidget = {
    totalFriends: '22',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }
  public friend = {
    name: 'Chat(22)',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  public messages = []


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
    console.log("User list here ")

     this.messengerService.getFriends().then(res =>{
      this.friends = res;
         })
    console.log("User heree :  "+JSON.stringify(this.friends))
  }

  public toggleFriends() {
    this.visible = !this.visible
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleFriends()
    }
  }

  
  openNewChat(i){
    console.log('Open chat box for user :'+this.friends[i].username)
    const factory = this.componentFactoryResolver.resolveComponentFactory(ChatWidgetComponent);
    let componentRef =  this.firstChatWidget.createComponent(factory);
    componentRef.instance.operator.name = this.friends[i].firstname+' '+this.friends[i].lastname;
   //componentRef.instance.someObservableOrEventEmitter.subscribe(data => this.prop = data);
  }
}