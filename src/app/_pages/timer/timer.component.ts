import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GiftsComponent } from '../../_components/gifts/gifts.component';
import { TimerControlsComponent } from '../../_components/timer-controls/timer-controls.component';
import { TimerService } from '../../_services/timer/timer.service';

@Component({
  selector: 'app-timer',
  imports: [AsyncPipe, NgStyle, GiftsComponent, TimerControlsComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  timerService = inject(TimerService);
  timerKey!: string | null;
  constructor(private route: ActivatedRoute) {
    this.timerKey = this.route.snapshot.paramMap.get('id');
  }
}
