import { TestBed } from '@angular/core/testing';

import { HistRefService } from './hist-ref.service';

describe('HistRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistRefService = TestBed.get(HistRefService);
    expect(service).toBeTruthy();
  });
});
