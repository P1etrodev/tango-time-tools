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

@Injectable({ providedIn: 'root' })
export class ClockService {
  private defaultColors = {
    color: localStorage.getItem('clock-color') ?? '#ffffff',
    background: localStorage.getItem('clock-background') ?? '#32CD32',
  };
  colors = {
    color: localStorage.getItem('clock-color') ?? '#ffffff',
    background: localStorage.getItem('clock-background') ?? '#32CD32',
  };
  resetColors() {
    this.colors = this.defaultColors;
    this.saveColors();
  }
  saveColors() {
    localStorage.setItem('clock-color', this.colors.color);
    localStorage.setItem('clock-background', this.colors.background);
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
    return this.passedTimeS$.value <= (this.totalSeconds$.value ?? 0);
  }

  private stop$ = new Subject<void>();

  totalSeconds$ = new BehaviorSubject<number | undefined>(undefined);
  private passedTimeS$ = new BehaviorSubject<number>(0);

  /**
   * Exposed observable clock string
   */
  readonly clock$: Observable<string | null> = this.started$.pipe(
    switchMap((started: boolean) => {
      if (!started) return of('00:00:00'); // ⛔ Si no ha iniciado, emitir null
      return interval(1000).pipe(
        withLatestFrom(this.paused$, this.totalSeconds$, this.passedTimeS$),
        filter(([_, paused, totalSeconds]) => !paused && totalSeconds !== null),
        takeUntil(this.stop$),
        map(([_, __, totalSeconds, passedS]) => {
          if (totalSeconds === undefined) return '00:00:00';

          const diffS = totalSeconds - passedS;

          if (diffS <= 0) {
            this.stop();
            return '00:00:00';
          }

          this.passedTimeS$.next(passedS + 1);

          const hours = Math.floor(diffS / 3600);
          const minutes = Math.floor((diffS % 3600) / 60);
          const seconds = diffS % 60;

          return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        })
      );
    })
  );

  start(): void {
    if (!this.totalSeconds$.value) return;
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
    this.totalSeconds$.next(undefined);
    this.paused$.next(false);
    this.started$.next(false);
  }

  reset() {
    this.passedTimeS$.next(0);
    this.totalSeconds$.next(undefined);
  }

  addSeconds(seconds: number): void {
    const currentS = this.totalSeconds$.value || 0;
    this.totalSeconds$.next(currentS + seconds);
  }

  private pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
