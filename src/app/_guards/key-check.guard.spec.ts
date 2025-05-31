import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { keyCheckGuard } from './key-check.guard';

describe('keyCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => keyCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
