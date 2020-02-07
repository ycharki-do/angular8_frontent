import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceAddComponent } from './reference-add.component';

describe('ReferenceAddComponent', () => {
  let component: ReferenceAddComponent;
  let fixture: ComponentFixture<ReferenceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
