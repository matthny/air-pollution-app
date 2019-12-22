import { TestBed } from '@angular/core/testing';

import { OpenAQService } from './open-aq.service';

describe('OpenAQService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenAQService = TestBed.get(OpenAQService);
    expect(service).toBeTruthy();
  });
});
