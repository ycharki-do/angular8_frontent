import {Component, Inject, OnInit} from '@angular/core';
import {Code} from '../../module/Code';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-code-dialog',
  templateUrl: './add-code-dialog.component.html',
  styleUrls: ['./add-code-dialog.component.css']
})
export class AddCodeDialogComponent implements OnInit {

  statusChoose = [
    {value: 1 , valueView: 'Temp'},
    {value: 2 , valueView: 'Busy'},
  ];
  statut: number;
  code: Code;
  constructor(public dialogRef: MatDialogRef<AddCodeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  selectedDone(code: Code) {
    this.code = code;
    console.log('the code was emitted : ' + code);
    console.log(code);
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.code.statut = this.statut;
    this.dialogRef.close({ code: this.code});
  }
}
