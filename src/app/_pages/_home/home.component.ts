import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SwitchComponent } from '../../_components/switch/switch.component';

@Component({
  selector: 'app-home',
  imports: [FormsModule, SwitchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);
  username: string = localStorage.getItem('tango-username') ?? '';
  rememberUsername: boolean = false;

  constructor() {
    if (this.username) this.navigateToTimer();
  }

  navigateToTimer() {
    if (this.rememberUsername)
      localStorage.setItem('tango-username', this.username);
    this.router.navigate([this.username]);
  }
}
