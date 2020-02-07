import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboordListComponent } from './dashboard-list.component';

describe('DashboordListComponent', () => {
  let component: DashboordListComponent;
  let fixture: ComponentFixture<DashboordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
