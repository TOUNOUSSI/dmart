import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsInputComponent } from './friends-input.component';

describe('FriendsInputComponent', () => {
  let component: FriendsInputComponent;
  let fixture: ComponentFixture<FriendsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
