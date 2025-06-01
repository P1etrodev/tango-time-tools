import { Component, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'switch',
  imports: [NgClass, FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  @Input() value!: boolean;
  @Input() label!: string;
}
