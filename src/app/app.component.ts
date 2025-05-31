import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClockService } from './_services/clock.service';
import { ControlsComponent } from './_components/controls/controls.component';
import { GiftsComponent } from './_components/gifts/gifts.component';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgStyle,
    GiftsComponent,
    ControlsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tango-counter';
  clockService = inject(ClockService);
}
