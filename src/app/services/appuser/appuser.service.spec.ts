import { TestBed } from '@angular/core/testing';

import { AppuserService } from './appuser.service';

describe('AppuserService', () => {
  let service: AppuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
