import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  static API_URL = 'http://localhost:8087/gmartws';

  title = 'DMART';

  // To close the electron app
  exit() {
    window.close();
  }
}
