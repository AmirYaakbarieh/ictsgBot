import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isGetBotInfoGuard } from './is-get-bot-info.guard';

describe('isGetBotInfoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isGetBotInfoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
