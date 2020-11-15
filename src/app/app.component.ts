import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  // static API_URL = 'https://gmart-communicator-ws.herokuapp.com/communicatorws';
  static API_URL = "http://localhost:8088/communicatorws";
  // communicatorws/api/gmartws/api/authenticate

  title = "DMART";
  // To close the electron app
  exit() {
    window.close();
  }
}
