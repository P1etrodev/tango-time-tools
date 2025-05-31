import { Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { TimerService } from './_services/timer/timer.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tango-counter';
  timerService = inject(TimerService);
}
