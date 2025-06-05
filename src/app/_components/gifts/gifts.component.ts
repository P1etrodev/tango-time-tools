import { Component, inject } from '@angular/core';
import { KeyValuePipe, NgClass, NgIf } from '@angular/common';

import { GiftComponent } from './gift/gift.component';
import { TimerService } from '../../_services/timer/timer.service';
import gifts from './gifts.json';

@Component({
  selector: 'gifts',
  imports: [GiftComponent, NgClass, KeyValuePipe, NgIf],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss',
})
export class GiftsComponent {
  gifts = gifts;
  timerService = inject(TimerService);
  openedCategory: 'classic' | 'artists' | 'love' | 'moods' | 'vip' | undefined =
    undefined;
  openCategory(category: string) {
    if (category === this.openedCategory) {
      this.openedCategory = undefined;
    } else {
      this.openedCategory = category as typeof this.openedCategory;
    }
  }
}
