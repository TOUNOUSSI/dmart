import { Injectable, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ChatWidgetComponent } from 'src/app/views/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatInjectorService {
  @ViewChild('firstChat', { read: ViewContainerRef ,static:false}) firstChat: ViewContainerRef;    
  constructor(private componentFactoryResolver:ComponentFactoryResolver ) { }

  injectChatInDashboard(){
    const factory=this.componentFactoryResolver.resolveComponentFactory(ChatWidgetComponent);
    this.firstChat.createComponent(factory);
   
  }
}
