import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from 'src/app/websocket-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private webSocketAPI : WebSocketAPI) { }

  theme: 'red';
  name: string;
  ngOnInit() {
   
  }

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

}
