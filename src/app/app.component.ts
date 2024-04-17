import { Component } from '@angular/core';
import { SignalrService } from './services/signalr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ranking-Dashboard';
  latestSummaries: any = [];

  constructor(private signalR: SignalrService) { 
    this.signalR.startConnection();
    this.signalR.addSummaryUpdateListener();
    this.signalR.latestSummary.subscribe((summary) => {
      this.latestSummaries = summary;
    });
  }
}
