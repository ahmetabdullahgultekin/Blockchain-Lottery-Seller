import { Injectable } from '@angular/core';
import {ContractService} from './contract.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  stage = '';
  duration: any;
  interval: any;
  timeLeft: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft = BigInt(this.timeLeft) - BigInt(1);
      }
    }, 1000);
  }
}
