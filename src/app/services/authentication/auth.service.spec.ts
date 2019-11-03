import { TestBed, inject ,async} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { routes } from '../../app.routing';

describe('AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      providers: [AuthService],
      imports: [ HttpClientModule,RouterModule.forRoot(routes) ] 
    }).compileComponents();
  }));
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
