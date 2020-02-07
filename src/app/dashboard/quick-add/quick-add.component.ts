import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Product} from '../../module/Product';
import {ProductService} from '../../products/product.service';
import {Projet} from '../../module/Projet';
import {ProjetService} from '../../shared/projet.service';
import {Reference} from '../../module/Reference';
import {ReferenceService} from '../../shared/reference.service';
import {Code} from '../../module/Code';
import {CodeService} from '../../shared/code.service';
import {MatDialogRef} from '@angular/material';
import {ProdRefService} from '../../shared/prod-ref.service';
import {RefCodeService} from '../../shared/ref-code.service';
import {RefCode} from '../../module/RefCode';
import {ProdRef} from '../../module/ProdRef';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})

export class QuickAddComponent implements OnInit {
  products: Product[];
  private  prodcut: Product;
  references: Reference[];
  projets: Projet[] = new Array<Projet>();
  statusChoose = [
    {value: 1 , valueView: 'Temp'},
    {value: 2 , valueView: 'Definitive'}
  ];
  zoneChoose = [
    {value: 'P'},
    {value: 'E'},
    {value: 'E/P'}
  ];
  codes: Code[];
  statusChoose1 = [
    {value: 1 , valueView: 'Temp'},
    {value: 2 , valueView: 'Busy'},
    {value: 3 , valueView: 'Reserved'}
  ];
  isLinear = false;

  firstFormGroup: FormGroup = new FormGroup({
    projet: new FormControl('', Validators.required ),
    nom: new FormControl('', [ Validators.required, Validators.minLength(3), this.customUniqueValidation()]),
    created: new FormControl('')
  });

  secondFormGroup: FormGroup = new FormGroup({
    nom: new FormControl('', [ Validators.required, Validators.minLength(9),
      Validators.maxLength(9), this.customUniqueValidation2() ]),
    zone: new FormControl('', [ Validators.required ]),
    statut: new FormControl('', [ Validators.required ]),
    date_ajout: new FormControl('')
  });

  thirdFormGroup: FormGroup = new FormGroup({
    numero: new FormControl('', [ Validators.required, this.customValidation() , this.customUniqueValidation3()]),
    statut: new FormControl('', [ Validators.required ]),
    date_attr: new FormControl('')
  });

  constructor(private _formBuilder: FormBuilder, private apiProduct: ProductService, public dialogRef: MatDialogRef<QuickAddComponent>,
              private projetService: ProjetService, private apiReference: ReferenceService, private apiCode: CodeService,
            private apiProdRef: ProdRefService, private apiRefCode: RefCodeService) {}

  ngOnInit() {
    this.apiProduct.getAllProduct().subscribe(res => {
      this.products = res;
    });
    this.apiReference.getAllReference().subscribe( res => {
      this.references = res;
    });
    this.apiCode.getAllCodes().subscribe(res => {
      this.codes = res;
    });
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

  customUniqueValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.products ) {
        const pr: Product = this.products.find(value => {
          return value.nom === control.value;
        });
        if ( pr ) {
          valid = true;
        }
      }
      return !valid ? null : { unique: true};
    };
  }

  customUniqueValidation2(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.references ) {
        const ref: Reference = this.references.find(value => {
          return value.nom === control.value;
        });
        if ( ref ) {
          valid = true;
        }
      }
      return !valid ? null : { unique: true};
    };
  }

  customValidation(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const wordLength = control.value.toString().trim().length;
      const valid = (wordLength === 3 || wordLength === 5);
      return valid ? null : { code: true };
    };
  }

  customUniqueValidation3(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let valid = false;
      if ( this.codes ) {
        const code: Code = this.codes.find(value => {
          return value.numero === control.value;
        });
        if ( code ) {
          valid = true;
        }
      }
      return !valid ? null : { unique: true};
    };
  }

  closeTS() {
    this.dialogRef.close();
    console.log('the close button has been pressed');
  }

  addAll() {
    // produit
    let produit = new Product();
    produit.projet = this.firstFormGroup.controls['projet'].value;
    produit.nom = this.firstFormGroup.controls['nom'].value;
    produit.date_ajout = this.firstFormGroup.controls['created'].value;
    // Reference
    let reference = new Reference();
    reference.nom = this.secondFormGroup.controls['nom'].value;
    reference.zone = this.secondFormGroup.controls['zone'].value;
    reference.statut = 0;
    reference.date_ajout = this.secondFormGroup.controls['date_ajout'].value;
    // Code
    let code = new Code();
    code.numero = this.thirdFormGroup.controls['numero'].value;
    code.statut = 0;
    code.date_attr = this.thirdFormGroup.controls['date_attr'].value;
    // add each element to the corresponding table
    this.apiProduct.addProduct(produit).subscribe(res => {
      console.log('from QuickAdd prod');
      console.log(res);
      produit = res;
      this.apiReference.addReference(reference).subscribe( ref => {
        console.log('from QuickAdd ref');
        console.log(ref);
        reference = ref;
        this.apiCode.getAddCode(code).subscribe(c => {
          console.log('from QuickAdd code');
          console.log(c);
          code = c;
          reference.statut = this.secondFormGroup.controls['statut'].value;
          const prodRef = new ProdRef();
          prodRef.produit = produit;
          prodRef.reference = reference;
          prodRef.date_attr = new Date();
          this.apiProdRef.addProdRef(prodRef).subscribe( res1 => {
            console.log('from QuickAdd prodref');
            console.log(res1);
            const refCode = new RefCode();
            code.statut = this.thirdFormGroup.controls['statut'].value;
            refCode.reference = reference;
            refCode.code = code;
            refCode.date_attr = new Date();
            this.apiRefCode.addRefCode(refCode).subscribe(res2 => {
              console.log('from QuickAdd refCode');
              console.log(res2);
              this.dialogRef.close({flag : 1});
          });
          });
        });
      });
    });
  }

}
