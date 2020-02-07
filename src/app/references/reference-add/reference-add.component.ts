import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ProjetService} from '../../shared/projet.service';
import {ReferenceService} from '../../shared/reference.service';
import {Code} from '../../module/Code';
import {Reference} from '../../module/Reference';

@Component({
  selector: 'app-reference-add',
  templateUrl: './reference-add.component.html',
  styleUrls: ['./reference-add.component.css']
})
export class ReferenceAddComponent implements OnInit {

  references: Reference[];

  statusChoose = [
    {value: 0 , valueView: 'Free'}
  ];

  zoneChoose = [
    {value: 'P'},
    {value: 'E'},
    {value: 'E/P'}
  ];

  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    nom: new FormControl('', [ Validators.required, Validators.minLength(9),
      Validators.maxLength(9), this.customUniqueValidation() ]),
    zone: new FormControl('', [ Validators.required ]),
    statut: new FormControl('', [ Validators.required ]),
    date_ajout: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<ReferenceAddComponent>,
    private apiReference: ReferenceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.apiReference.getAllReference().subscribe( res => {
      this.references = res;
    });

    if ( this.data && this.data.flag === 2 ) {
      this.form.controls['id'].setValue(this.data.id);
      this.form.controls['nom'].setValue(this.data.nom);
      this.form.controls['zone'].setValue(this.data.zone);
      this.form.controls['statut'].setValue(this.data.statut);
      this.form.controls['date_ajout'].setValue(this.data.date_ajout);
      if ( this.data.statut !== 0) {
        this.statusChoose = [
          {value: 1 , valueView: 'Temp'},
          {value: 2 , valueView: 'Definitive'}
        ];
      }
    }

  }

  customUniqueValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.references ) {
        const ref: Reference = this.references.find(value => {
          return value.nom === control.value;
        });
        if ( ref ) {
          valid = true;
          if ( this.data ) {
            valid = this.data.nom !== control.value;
          }
        }
      }
      return !valid ? null : { unique: true};
    };
  }

  onNoClick() {
    this.dialogRef.close();
  }

  addReference() {
    const data = {
      id: this.form.controls['id'].value,
      nom: this.form.controls['nom'].value,
      zone: this.form.controls['zone'].value,
      statut: this.form.controls['statut'].value,
      date_ajout: this.form.controls['date_ajout'].value
    };
    this.dialogRef.close(data);
  }
}
