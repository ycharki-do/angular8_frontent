import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodeDialogComponent } from './add-code-dialog.component';

describe('AddCodeDialogComponent', () => {
  let component: AddCodeDialogComponent;
  let fixture: ComponentFixture<AddCodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
