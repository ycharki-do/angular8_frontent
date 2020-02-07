import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Product} from '../../module/Product';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Projet} from '../../module/Projet';
import {Observable} from 'rxjs';
import {ProjetService} from '../../shared/projet.service';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  private  prodcut: Product;
  products: Product[];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    projet: new FormControl('', Validators.required ),
    nom: new FormControl('', [ Validators.required, Validators.minLength(3), this.customUniqueValidation()]),
    created: new FormControl('')
  });
  filteredProjets: Observable<Projet[]>;
  projets: Projet[] = new Array<Projet>();

  constructor(
    public dialogRef: MatDialogRef<ProductAddComponent>,
    private projetService: ProjetService, private apiProduct: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.projetService.getAllProjet().subscribe(res => {
      res.map(value => {
        const pr: Projet = new Projet();
        pr.id = value.id;
        pr.nom = value.nom;
        pr.date_ajout = value.date_ajout;
        this.projets.push(pr);
      });
    });
  }

  ngOnInit() {

    this.apiProduct.getAllProduct().subscribe(res => {
      this.products = res;
    });

    if (this.data.flag === 2) {
      this.form.controls['id'].setValue(this.data.id);
      this.form.controls['nom'].setValue(this.data.nom);
      this.form.controls['projet'].setValue(this.data.projet);
      this.form.controls['created'].setValue(this.data.date_ajout);
      console.log(this.data);
    }
    //
    // this.filteredProjets = this.form.controls['projet'].valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
  }

  // private _filter(value: any): Projet[] {
  //     let filterValue;
  //     if ( value.nom ) {
  //       filterValue = value.nom.toLowerCase();
  //     } else {
  //       filterValue = value.toLowerCase();
  //     }
  //     return this.projets.filter(option => option.nom.toLowerCase().includes(filterValue));
  // }

  addProduit() {
    const data = {
      id: this.form.controls['id'].value,
      projet: this.form.controls['projet'].value,
      nom: this.form.controls['nom'].value,
      date_ajout: this.form.controls['created'].value
    };
    this.dialogRef.close(data);
  }

  onNoClick(): void {
    console.log(this.form);
    this.dialogRef.close();
  }

  // displayFn(pr?: Projet): string | undefined {
  //   return pr ? pr.nom : undefined;
  // }
  //
  // RequireMatch(control: AbstractControl) {
  //   const selection: any = control.value;
  //   // if ( selection.workingNeedSomeTime ) {
  //   //    return { incorrect: true };
  //   // }
  //   return null;
  // }

  customUniqueValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.products ) {
        const pr: Product = this.products.find(value => {
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

}
