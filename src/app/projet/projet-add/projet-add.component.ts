import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CodeService} from '../../shared/code.service';
import {Projet} from '../../module/Projet';
import {ProjetService} from '../../shared/projet.service';
import {Code} from '../../module/Code';


@Component({
  selector: 'app-projet-add',
  templateUrl: './projet-add.component.html',
  styleUrls: ['./projet-add.component.css']
})
export class ProjetAddComponent implements OnInit {

  projets: Projet[];

  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    nom: new FormControl('', [ Validators.required, Validators.minLength(3),
      this.customUniqueValidation()]),
    date_ajout: new FormControl('')
  });

  constructor(
    public dialogRef: MatDialogRef<ProjetAddComponent>,
    private apiProjet: ProjetService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.apiProjet.getAllProjet().subscribe(res => {
      this.projets = res;
    });

    if ( this.data && this.data.flag === 2 ) {
      this.form.controls['id'].setValue(this.data.id);
      this.form.controls['nom'].setValue(this.data.nom);
      this.form.controls['date_ajout'].setValue(this.data.date_ajout);
    }

  }

  customUniqueValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.projets ) {
        const pr: Projet = this.projets.find(value => {
          return value.nom === control.value;
        });
        if ( pr ) {
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

  addCode() {
    const data = {
      id: this.form.controls['id'].value,
      nom: this.form.controls['nom'].value,
      date_ajout: this.form.controls['date_ajout'].value
    };
    this.dialogRef.close(data);
  }

}
