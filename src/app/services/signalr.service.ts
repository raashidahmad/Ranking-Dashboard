import { Injectable } from '@angular/core';
import * as SignalR from "@microsoft/SignalR";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private connection: any = null;
  public latestSummary = new Subject<any>();
  constructor() { 
    this.connection = new SignalR.HubConnectionBuilder().withUrl("http://localhost:5283/StudentRankingLatest")   // mapping to the chathub as in startup.cs
      .configureLogging(SignalR.LogLevel.Information)
      .build();
    
  }

  ngOnInit() {
  }

  addSummaryUpdateListener(): void {
    this.connection.on('summaryUpdated', (summary: any) => { 
      console.log('Summary updated');
      this.refreshTheUpdatedSummary(summary); 
    });
  }

  startConnection(): void {
    if (this.connection == null || !this.connection.started ) {
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
    console.log('Summary updated', summary);
    this.latestSummary.next(summary);
  }

}
