import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  iconoirPause,
  iconoirPlay,
  iconoirText,
  iconoirTextSquare,
} from '@ng-icons/iconoir';

import { ClockService } from '../../_services/clock.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-controls',
  imports: [NgIcon, FormsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  providers: [
    provideIcons({ iconoirPlay, iconoirPause, iconoirText, iconoirTextSquare }),
    provideNgIconsConfig({ strokeWidth: '3' }),
  ],
})
export class ControlsComponent {
  clockService = inject(ClockService);

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
    if (this.clockService.isStarted) {
      this.clockService.stop();
    } else {
      this.clockService.start();
      this.newTimerForm.hours = 0;
      this.newTimerForm.minutes = 0;
      this.newTimerForm.seconds = 0;
    }
  }

  onNewTimerFormChange() {
    if (!this.newTimerForm.hours) this.newTimerForm.hours = 0;
    this.newTimerForm.minutes = Math.min(59, this.newTimerForm.minutes ?? 0);
    this.newTimerForm.seconds = Math.min(59, this.newTimerForm.seconds ?? 0);
    this.clockService.totalSeconds$.next(this.newTimerTotalSeconds);
  }
}
