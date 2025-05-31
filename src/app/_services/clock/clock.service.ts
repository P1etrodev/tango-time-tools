import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  interval,
  map,
  of,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { pad } from '../../_scripts/pad';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private defaultColors = {
    color: localStorage.getItem('timer-color') ?? '#ffffff',
    background: localStorage.getItem('timer-background') ?? '#32CD32',
  };
  colors = {
    color: localStorage.getItem('timer-color') ?? '#ffffff',
    background: localStorage.getItem('timer-background') ?? '#32CD32',
  };
  resetColors() {
    this.colors = this.defaultColors;
    this.saveColors();
  }
  saveColors() {
    localStorage.setItem('timer-color', this.colors.color);
    localStorage.setItem('timer-background', this.colors.background);
  }

  private paused$ = new BehaviorSubject<boolean>(false);
  get isPaused() {
    return this.paused$.value;
  }

  private started$ = new BehaviorSubject<boolean>(false);
  get isStarted() {
    return this.started$.value;
  }

  private stop$ = new Subject<void>();

  private passedTimeS$ = new BehaviorSubject<number>(0);

  readonly timer$: Observable<string | null> = this.started$.pipe(
    switchMap((started: boolean) => {
      if (!started) return of('00:00:00'); // ⛔ Si no ha iniciado, emitir null
      return interval(1000).pipe(
        withLatestFrom(this.paused$, this.passedTimeS$),
        filter(([_, paused]) => !paused),
        takeUntil(this.stop$),
        map(([_, __, passedS]) => {
          this.passedTimeS$.next(passedS + 1);

          const hours = Math.floor(passedS / 3600);
          const minutes = Math.floor((passedS % 3600) / 60);
          const seconds = passedS % 60;

          return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        })
      );
    })
  );

  start(): void {
    this.stop$.next();
    this.passedTimeS$.next(0);
    this.paused$.next(false);
    this.started$.next(true);
  }

  pause(): void {
    const isPaused = this.paused$.value;
    this.paused$.next(!isPaused);
  }

  stop(): void {
    this.stop$.next();
    this.passedTimeS$.next(0);
    this.paused$.next(false);
    this.started$.next(false);
  }

  reset() {
    this.passedTimeS$.next(0);
  }
}
