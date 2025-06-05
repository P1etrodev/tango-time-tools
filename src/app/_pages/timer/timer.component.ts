import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { iconoirClock, iconoirTimer, iconoirXmark } from '@ng-icons/iconoir';

import { ClockControlsComponent } from '../../_components/clock-controls/clock-controls.component';
import { ClockService } from '../../_services/clock/clock.service';
import { FormsModule } from '@angular/forms';
import { GiftsComponent } from '../../_components/gifts/gifts.component';
import { TimerControlsComponent } from '../../_components/timer-controls/timer-controls.component';
import { TimerService } from '../../_services/timer/timer.service';

@Component({
  selector: 'app-timer',
  imports: [
    AsyncPipe,
    NgStyle,
    GiftsComponent,
    TimerControlsComponent,
    ClockControlsComponent,
    NgClass,
    FormsModule,
    NgIcon,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  providers: [
    provideIcons({
      iconoirTimer,
      iconoirClock,
      iconoirXmark,
    }),
    provideNgIconsConfig({ strokeWidth: 3, size: '1.25rem' }),
  ],
})
export class TimerComponent {
  timerService = inject(TimerService);
  clockService = inject(ClockService);
  mode: 'timer' | 'clock' = 'timer';

  changeMode(mode: 'clock' | 'timer') {
    this.mode = mode;
  }
}
