import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ReferenceService} from '../../shared/reference.service';
import {CodeService} from '../../shared/code.service';
import {Code} from '../../module/Code';

@Component({
  selector: 'app-code-add',
  templateUrl: './code-add.component.html',
  styleUrls: ['./code-add.component.css']
})
export class CodeAddComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CodeAddComponent>,
    private apiCode: CodeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  codes: Code[];
  statusChoose = [
    {value: 0 , valueView: 'Free'},
    {value: 3 , valueView: 'Reserved'}
  ];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    numero: new FormControl('', [ Validators.required, this.customValidation() , this.customUniqueValidation()]),
    statut: new FormControl('', [ Validators.required ]),
    date_attr: new FormControl('')
  });

  customValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const wordLength = control.value.toString().trim().length;
      const valid = (wordLength === 3 || wordLength === 5);
      return valid ? null : { code: true };
    };
  }

  customUniqueValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.codes ) {
        const code: Code = this.codes.find(value => {
          return value.numero === control.value;
        });
        if ( code ) {
          valid = true;
          if ( this.data ) {
            valid = this.data.numero !== control.value;
          }
        }
      }
      return !valid ? null : { unique: true};
    };
  }

  ngOnInit() {

    this.apiCode.getAllCodes().subscribe(res => {
      this.codes = res;
    });

    if ( this.data && this.data.flag === 2 ) {
      this.form.controls['id'].setValue(this.data.id);
      this.form.controls['numero'].setValue(this.data.numero);
      this.form.controls['statut'].setValue(this.data.statut);
      this.form.controls['date_attr'].setValue(this.data.date_attr);
      if (this.data.statut === 1 || this.data.statut === 2) {
        this.statusChoose = [
          {value: 0 , valueView: 'Free'},
          {value: 1 , valueView: 'Temp'},
          {value: 2 , valueView: 'Busy'},
          {value: 3 , valueView: 'Reserved'}
        ];
        this.form.controls['statut'].disable({onlySelf : true});
      }
    }

  }

  onNoClick() {
    this.dialogRef.close();
  }

  addCode() {
    const data = {
      id: this.form.controls['id'].value,
      numero: this.form.controls['numero'].value,
      statut: this.form.controls['statut'].value,
      date_attr: this.form.controls['date_attr'].value
    };
    this.dialogRef.close(data);
  }
}
