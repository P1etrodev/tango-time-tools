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
import { clockFromSeconds } from '../../_scripts/clockFromSeconds';

@Injectable({ providedIn: 'root' })
export class TimerService {
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
    return (this.started$.value && this.totalSeconds$.value) as boolean;
  }

  get isFinished() {
    return this.elapsedSeconds$.value <= (this.totalSeconds$.value ?? 0);
  }

  private stopSignal$ = new Subject<void>();

  totalSeconds$ = new BehaviorSubject<number | undefined>(undefined);
  private elapsedSeconds$ = new BehaviorSubject<number>(0);

  readonly timer$: Observable<string | null> = this.started$.pipe(
    switchMap((started: boolean) => {
      if (!started) return of('00:00:00');
      return interval(1000).pipe(
        withLatestFrom(this.paused$, this.totalSeconds$, this.elapsedSeconds$),
        filter(([_, paused, totalSeconds]) => !paused && totalSeconds !== null),
        takeUntil(this.stopSignal$),
        map(([_, __, totalSeconds, elapsedSeconds]) => {
          if (totalSeconds === undefined) return '00:00:00';
          const diffS = totalSeconds - elapsedSeconds;
          if (diffS <= 0) {
            this.stop();
            return '00:00:00';
          }
          this.elapsedSeconds$.next(elapsedSeconds + 1);
          return clockFromSeconds(diffS);
        })
      );
    })
  );

  start(): void {
    if (!this.totalSeconds$.value) return;
    this.stopSignal$.next();
    this.elapsedSeconds$.next(0);
    this.paused$.next(false);
    this.started$.next(true);
  }

  pause(): void {
    const isPaused = this.paused$.value;
    this.paused$.next(!isPaused);
  }

  stop(): void {
    this.stopSignal$.next();
    this.elapsedSeconds$.next(0);
    this.totalSeconds$.next(undefined);
    this.paused$.next(false);
    this.started$.next(false);
  }

  reset() {
    this.elapsedSeconds$.next(0);
    this.totalSeconds$.next(undefined);
  }

  addSeconds(seconds: number): void {
    const currentS = this.totalSeconds$.value || 0;
    this.totalSeconds$.next(currentS + seconds);
  }
}
