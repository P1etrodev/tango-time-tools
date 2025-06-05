import { HomeComponent } from './_pages/_home/home.component';
import { Routes } from '@angular/router';
import { TimerComponent } from './_pages/timer/timer.component';
import { usernameGuard } from './_guards/username.guard';

export const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    pathMatch: 'full',
    redirectTo: 'timer',
  },
  {
    path: ':key',
    canActivate: [usernameGuard],
    component: TimerComponent,
  },
];
