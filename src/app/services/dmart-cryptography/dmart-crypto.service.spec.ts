import { TestBed } from '@angular/core/testing';

import { DmartCryptoService } from './dmart-crypto.service';

describe('DmartCryptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DmartCryptoService = TestBed.get(DmartCryptoService);
    expect(service).toBeTruthy();
  });
});
