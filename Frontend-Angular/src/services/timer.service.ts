import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  stages = ['Not Started', 'Selling Tickets', 'Determining Winner', 'Completed'];
  stage = this.stages[0];
  sellingDuration = 10.0;
  determineWinnerDuration = 5.0;
  interval: any;
  timeLeft = this.sellingDuration;

  startTimer() {
    this.stage = this.stages[1];
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = this.timeLeft - 0.01;
      } else {
        if (this.stage === this.stages[2]) {
          this.stage = this.stages[3];
          this.stopTimer();
          return;
        }
        this.stage = this.stages[2];
        this.timeLeft = this.determineWinnerDuration;
      }
    }, 10);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.timeLeft = 0;
  }

  resetTimer() {
    this.timeLeft = this.sellingDuration;
  }
}
