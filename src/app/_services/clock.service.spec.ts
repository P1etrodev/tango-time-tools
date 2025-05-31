import { ClockService } from './clock.service';
import { TestBed } from '@angular/core/testing';

describe('CounterService', () => {
  let service: ClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
