import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
   static API_URL = 'https://gmart-communicator-ws.herokuapp.com/communicatorws';
  //static API_URL = "http://localhost:8088/communicatorws";
  // communicatorws/api/gmartws/api/authenticate
 // static API_URL = 'https://gmart-communicator-ws.herokuapp.com/communicatorws';
 static CHAT_API_WEBSOCKETS_URL = 'https://gmart-ws-chat-websockets.herokuapp.com/gmart-chat-ws/gmart-chat-ws'
 //static CHAT_API_WEBSOCKETS_URL = 'http://localhost:9091/gmart-chat-ws/gmart-chat-ws'

  title = "DMART";
  // To close the electron app
  exit() {
    window.close();
  }
}
