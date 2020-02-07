import { TestBed } from '@angular/core/testing';

import { HistCodeService } from './hist-code.service';

describe('HistCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistCodeService = TestBed.get(HistCodeService);
    expect(service).toBeTruthy();
  });
});
