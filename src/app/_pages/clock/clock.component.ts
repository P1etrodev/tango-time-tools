import { Component, inject } from '@angular/core';

import { ClockService } from '../../_services/clock/clock.service';

@Component({
  selector: 'clock',
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss',
})
export class ClockComponent {
  clockService = inject(ClockService);
}
