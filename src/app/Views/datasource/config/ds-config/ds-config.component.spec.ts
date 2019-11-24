import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourceComponent } from './ds-config.component';

describe('DatasourceComponent', () => {
  let component: DatasourceComponent;
  let fixture: ComponentFixture<DatasourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
