import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { WebSocketAPI } from 'src/app/websocket-api';
import { ChatWidgetComponent } from '../../chat';
import * as $ from "jquery";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  counter: number = 2;
  constructor(private webSocketAPI: WebSocketAPI, ) { }

  theme: 'red';
  name: string;
  ngOnInit() {

  }


  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name)
    this.handleMessage();
  }

  handleMessage() {
    console.log("Message handled")
    console.log("response from observable here " + this.webSocketAPI.message)

  }


  generateId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
