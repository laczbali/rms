import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'rms-fe';
  backendMessage = '-';

  constructor() {
    this.getBackendMessage();
  }

  getBackendMessage() {
    console.log('Fetching message from ' + environment.backendUrl);

    fetch(`${environment.backendUrl}/test/m1`)
      .then(response => response.text())
      .then(data => {
        this.backendMessage = data;
      });
  }

}
