import { Component, Input, inject } from '@angular/core';

import { ClockService } from '../../../_services/clock.service';

@Component({
  selector: 'app-gift',
  imports: [],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss',
})
export class GiftComponent {
  clockService = inject(ClockService);

  @Input() gift!: any;
}
