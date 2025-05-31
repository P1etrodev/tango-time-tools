import { Component, Input, inject } from '@angular/core';

import { TimerService } from '../../../_services/timer/timer.service';

@Component({
  selector: 'gift',
  imports: [],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss',
})
export class GiftComponent {
  timerService = inject(TimerService);

  @Input() gift!: any;
}
