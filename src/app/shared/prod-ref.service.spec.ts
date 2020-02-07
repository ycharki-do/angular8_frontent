import { TestBed } from '@angular/core/testing';

import { ProdRefService } from './prod-ref.service';

describe('ProdRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdRefService = TestBed.get(ProdRefService);
    expect(service).toBeTruthy();
  });
});
