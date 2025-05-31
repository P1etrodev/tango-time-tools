import { Component, inject } from '@angular/core';

import { GiftComponent } from './gift/gift.component';
import { TimerService } from '../../_services/timer/timer.service';
import gifts from './gifts.json';

@Component({
  selector: 'gifts',
  imports: [GiftComponent],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss',
})
export class GiftsComponent {
  gifts = gifts;
  timerService = inject(TimerService);
}
