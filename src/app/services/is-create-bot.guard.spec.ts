import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isCreateBotGuard } from './is-create-bot.guard';

describe('isCreateBotGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isCreateBotGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
