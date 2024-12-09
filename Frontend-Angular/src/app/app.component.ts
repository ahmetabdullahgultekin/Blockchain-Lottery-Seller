import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ContractService} from '../services/contract.service';
import {TimerService} from '../services/timer.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blockchain Lottery Market';

  dashArray = 2 * Math.PI * 45; // Circumference of the circle
  dashOffset = this.dashArray;

  constructor(protected contractService: ContractService, protected timerService: TimerService) {
  }

  ngOnInit() {
    this.timerService.startTimer();
  }
}
