import { TestBed } from '@angular/core/testing';

import { GmartCookieService } from './gmart-cookie.service';

describe('GmartCookieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GmartCookieService = TestBed.get(GmartCookieService);
    expect(service).toBeTruthy();
  });
});
