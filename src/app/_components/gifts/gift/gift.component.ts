import { Component, Input, inject } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { iconoirMinus, iconoirPlus } from '@ng-icons/iconoir';

import { FormsModule } from '@angular/forms';
import { TimerService } from '../../../_services/timer/timer.service';

@Component({
  selector: 'gift',
  imports: [FormsModule, NgIcon],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss',
  providers: [
    provideIcons({ iconoirPlus, iconoirMinus }),
    provideNgIconsConfig({ size: '1rem', strokeWidth: 3 }),
  ],
})
export class GiftComponent {
  timerService = inject(TimerService);
  @Input() gift!: any;

  private _customAmount: number = 2;
  get customAmount() {
    return this._customAmount;
  }
  set customAmount(v: number) {
    this._customAmount = Math.max(1, v);
  }
  addCustomAmount() {
    this.timerService.addSeconds(this.gift.timeValue * this.customAmount);
    this.customAmount = 2;
  }
}
