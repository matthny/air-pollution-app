import { TestBed } from '@angular/core/testing';

import { PollutionWarningService } from './pollution-warning.service';

describe('PollutionWarningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollutionWarningService = TestBed.get(PollutionWarningService);
    expect(service).toBeTruthy();
  });
});
