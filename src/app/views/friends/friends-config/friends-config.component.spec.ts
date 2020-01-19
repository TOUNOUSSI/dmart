import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsConfigComponent } from './friends-config.component';

describe('FriendsConfigComponent', () => {
  let component: FriendsConfigComponent;
  let fixture: ComponentFixture<FriendsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
