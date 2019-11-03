import { TestBed, async,inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './account.service';

describe('AccountService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      providers: [AccountService],
      imports: [ HttpClientModule ] 
    }).compileComponents();
  }));
  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
