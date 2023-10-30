import { Injectable } from '@angular/core';
import * as SignalR from "@microsoft/SignalR";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private connection: any = null;
  private latestSummary = new Subject<any>();
  constructor() { 
    this.connection = new SignalR.HubConnectionBuilder().withUrl("http://localhost:5283/StudentRankingHub")   // mapping to the chathub as in startup.cs
      .configureLogging(SignalR.LogLevel.Information)
      .build();

      this.connection.on('SummaryUpdated', (summary: any) => { this.refreshTheUpdatedSummary(summary)  });
  }

  startConnection(): void {
    if (this.connection == null) {
      this.connection
        .start()
        .then(() => {
          console.log('SignalR summary notification started');
        })
        .catch((err: any) => {
          console.log('Error while establishing connection order notification, retrying...' + err);
          setTimeout(() => { this.startConnection(); }, 500);
        });
    } else {
      console.log('Connection is enabled');
    }
  }

  refreshTheUpdatedSummary(summary: any) {
    this.latestSummary.next(summary);
  }

}
