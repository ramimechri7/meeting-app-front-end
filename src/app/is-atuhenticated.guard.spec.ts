import { TestBed } from '@angular/core/testing';

import { IsAtuhenticatedGuard } from './is-atuhenticated.guard';

describe('IsAtuhenticatedGuard', () => {
  let guard: IsAtuhenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAtuhenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
