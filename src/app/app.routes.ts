import { HomeComponent } from './_pages/home/home.component';
import { Routes } from '@angular/router';
import { TimerComponent } from './_pages/timer/timer.component';
import { keyCheckGuard } from './_guards/key-check.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'timer',
  },
  {
    path: ':key',
    canActivate: [keyCheckGuard],
    component: TimerComponent,
  },
];
