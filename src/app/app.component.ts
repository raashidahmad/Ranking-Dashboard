import { Component } from '@angular/core';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ranking-Dashboard';

  constructor(private signalR: SignalrService) {
    this.signalR.startConnection();
  }
}
