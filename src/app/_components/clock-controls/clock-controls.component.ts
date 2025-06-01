import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  iconoirClock,
  iconoirFloppyDisk,
  iconoirPause,
  iconoirPlay,
  iconoirTimer,
} from '@ng-icons/iconoir';

import { ClockService } from '../../_services/clock/clock.service';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from '../switch/switch.component';

@Component({
  selector: 'clock-controls',
  imports: [NgIcon, FormsModule, SwitchComponent],
  templateUrl: './clock-controls.component.html',
  styleUrl: './clock-controls.component.scss',
  providers: [
    provideIcons({
      iconoirPlay,
      iconoirPause,
      iconoirFloppyDisk,
    }),
    provideNgIconsConfig({ strokeWidth: '3' }),
  ],
})
export class ClockControlsComponent {
  clockService = inject(ClockService);
  stopOnSave = false;

  saveRecord() {
    this.clockService.addRecord();
    if (this.stopOnSave) this.clockService.stop();
  }
}
