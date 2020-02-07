import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRefDialogComponent } from './add-ref-dialog.component';

describe('AddRefDialogComponent', () => {
  let component: AddRefDialogComponent;
  let fixture: ComponentFixture<AddRefDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRefDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRefDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
