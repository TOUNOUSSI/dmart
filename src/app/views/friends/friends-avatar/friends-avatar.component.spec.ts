import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsAvatarComponent } from './friends-avatar.component';

<<<<<<< HEAD
describe('FriendsWidgetAvatarComponent', () => {
=======
describe('FriendsAvatarComponent', () => {
>>>>>>> 75eaa79 (first commit)
  let component: FriendsAvatarComponent;
  let fixture: ComponentFixture<FriendsAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
