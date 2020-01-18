import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsWidgetComponent } from './friends-widget.component';

describe('FriendsWidgetComponent', () => {
  let component: FriendsWidgetComponent;
  let fixture: ComponentFixture<FriendsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
