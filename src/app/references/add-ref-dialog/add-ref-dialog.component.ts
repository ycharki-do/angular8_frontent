import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {ReferenceListComponent} from '../reference-list/reference-list.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProjetService} from '../../shared/projet.service';
import {Reference} from '../../module/Reference';

@Component({
  selector: 'app-add-ref-dialog',
  templateUrl: './add-ref-dialog.component.html',
  styleUrls: ['./add-ref-dialog.component.css']
})
export class AddRefDialogComponent implements OnInit , OnDestroy {
  static staticRef: Reference;
  showDate = false;
  ref: Reference = new Reference();
  temp: any;
  date_fin: any;

  constructor(    public dialogRef: MatDialogRef<AddRefDialogComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    AddRefDialogComponent.staticRef = null;
  }


  cancel() {
    AddRefDialogComponent.staticRef = null;
    this.dialogRef.close();
  }

  confirm() {
    this.ref = AddRefDialogComponent.staticRef;
    this.ref.statut = this.showDate ? 1 : 2;
    AddRefDialogComponent.staticRef = null;
    this.dialogRef.close({ reference: this.ref});
  }

  changeView() {
    this.showDate = !this.showDate;
  }

  validat() {
    if ( AddRefDialogComponent.staticRef === null ) {
      return true;
    } return this.showDate && this.date_fin === null;

  }

  ngOnDestroy(): void {
    this.ref = AddRefDialogComponent.staticRef;
  }
}
