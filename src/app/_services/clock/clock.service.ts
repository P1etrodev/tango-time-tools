import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  interval,
  lastValueFrom,
  map,
  of,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

import { Injectable } from '@angular/core';
import { clockFromSeconds } from '../../_scripts/clockFromSeconds';

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

  records = new Array<{
    id: string;
    createdAt: string;
    name: string;
    time: string;
    seconds: number;
  }>();
  get stringifiedRecords() {
    return JSON.stringify(this.records);
  }
  private get bestRecord() {
    if (!this.records.length) return null;
    return this.records.reduce((max, curr) =>
      curr.seconds < max.seconds ? curr : max
    );
  }
  private get worstRecord() {
    if (!this.records.length) return null;
    return this.records.reduce((max, curr) =>
      curr.seconds > max.seconds ? curr : max
    );
  }
  get stats() {
    const secondsArray = this.records.map((e) => e.seconds);
    const avgSeconds = Math.floor(
      secondsArray.reduce((previous, e) => previous + e) / secondsArray.length
    );
    return {
      avg: clockFromSeconds(avgSeconds),
      min: this.bestRecord?.time,
      max: this.worstRecord?.time,
    };
  }
  addRecord(): void {
    const elapsedSeconds = this.elapsedSeconds$.value;
    const currentRecord = clockFromSeconds(elapsedSeconds);
    this.records.push({
      id: crypto.randomUUID(),
      createdAt: new Date().toLocaleString(),
      seconds: elapsedSeconds,
      time: currentRecord,
      name: `Record ${this.records.length + 1}`,
    });
    this.saveRecords();
    this.elapsedSeconds$.next(0);
    this.stop();
    this.start();
  }
  deleteRecord(id?: string) {
    if (id === undefined) {
      this.records = [];
    } else {
      this.records = this.records.filter((e) => e.id !== id);
    }
    this.saveRecords();
  }
  saveRecords() {
    localStorage.setItem('clock-records', this.stringifiedRecords);
  }

  private paused$ = new BehaviorSubject<boolean>(false);
  get isPaused() {
    return this.paused$.value;
  }

  private started$ = new BehaviorSubject<boolean>(false);
  get isStarted() {
    return this.started$.value;
  }

  private stopSignal$ = new Subject<void>();

  private elapsedSeconds$ = new BehaviorSubject<number>(0);
  get elapsedSeconds() {
    return this.elapsedSeconds$.value;
  }

  readonly clock$: Observable<string> = this.started$.pipe(
    switchMap((started: boolean) => {
      if (!started) return of('00:00:00');
      let seconds = 0;
      return interval(1000).pipe(
        withLatestFrom(this.paused$),
        filter(([_, paused]) => !paused),
        takeUntil(this.stopSignal$),
        map(() => {
          seconds += 1;
          this.elapsedSeconds$.next(seconds);
          return clockFromSeconds(seconds);
        })
      );
    })
  );

  constructor() {
    const savedRecords = localStorage.getItem('clock-records');
    if (savedRecords) this.records = JSON.parse(savedRecords);
  }

  start(): void {
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
    this.paused$.next(false);
    this.started$.next(false);
  }
}
