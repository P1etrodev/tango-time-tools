import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  iconoirPause,
  iconoirPlay,
  iconoirText,
  iconoirTextSquare,
} from '@ng-icons/iconoir';

import { FormsModule } from '@angular/forms';
import { TimerService } from '../../_services/timer/timer.service';

@Component({
  selector: 'timer-controls',
  imports: [NgIcon, FormsModule],
  templateUrl: './timer-controls.component.html',
  styleUrl: './timer-controls.component.scss',
  providers: [
    provideIcons({ iconoirPlay, iconoirPause, iconoirText, iconoirTextSquare }),
    provideNgIconsConfig({ strokeWidth: '2', size: '1.25rem' }),
  ],
})
export class TimerControlsComponent {
  timerService = inject(TimerService);

  newTimerForm = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  private get newTimerTotalSeconds() {
    const { hours, minutes, seconds } = this.newTimerForm;
    return hours * 3600 + minutes * 60 + seconds;
  }
  get isTimeValid() {
    return this.newTimerTotalSeconds > 0;
  }

  addTimeForm = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  onMainButtonClicked() {
    if (this.timerService.isStarted) {
      this.timerService.stop();
    } else {
      this.timerService.start();
      this.newTimerForm.hours = 0;
      this.newTimerForm.minutes = 0;
      this.newTimerForm.seconds = 0;
    }
  }

  onNewTimerFormChange() {
    if (!this.newTimerForm.hours) this.newTimerForm.hours = 0;
    this.newTimerForm.minutes = Math.min(59, this.newTimerForm.minutes ?? 0);
    this.newTimerForm.seconds = Math.min(59, this.newTimerForm.seconds ?? 0);
    this.timerService.totalSeconds$.next(this.newTimerTotalSeconds);
  }
}
