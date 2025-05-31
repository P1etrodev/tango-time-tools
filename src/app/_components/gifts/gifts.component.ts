import { Component, inject } from '@angular/core';

import { ClockService } from '../../_services/clock.service';
import { GiftComponent } from './gift/gift.component';
import gifts from './gifts.json';

@Component({
  selector: 'app-gifts',
  imports: [GiftComponent],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss',
})
export class GiftsComponent {
  gifts = gifts;
  clockService = inject(ClockService);
}
