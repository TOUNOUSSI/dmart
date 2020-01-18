import { TestBed } from '@angular/core/testing';

import { DsService } from './ds.service';

describe('DsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DsService = TestBed.get(DsService);
    expect(service).toBeTruthy();
  });
});
