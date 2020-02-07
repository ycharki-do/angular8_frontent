import { Component, OnInit } from '@angular/core';
import {Projet} from '../../module/Projet';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from '../../shared/projet.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Product} from '../../module/Product';
import {ProjetAddComponent} from '../../projet/projet-add/projet-add.component';
import {ProdRef} from '../../module/ProdRef';
import {Reference} from '../../module/Reference';
import {ReferenceService} from '../../shared/reference.service';
import {ProdRefService} from '../../shared/prod-ref.service';
import {ReferenceAddComponent} from '../reference-add/reference-add.component';
import {AddRefDialogComponent} from '../add-ref-dialog/add-ref-dialog.component';
import {AddCodeDialogComponent} from '../../codes/add-code-dialog/add-code-dialog.component';
import {RefCode} from '../../module/RefCode';
import {RefCodeService} from '../../shared/ref-code.service';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {HistCode} from '../../module/HistCode';
import {HistRef} from '../../module/HistRef';
import {HistCodeService} from '../../shared/hist-code.service';
import {HistRefService} from '../../shared/hist-ref.service';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.css']
})
export class ReferenceDetailsComponent implements OnInit {

  reference: Reference;
  prodRefs: ProdRef[];
  refCodes: RefCode[];
  histCodes: HistCode[];
  histRefs: HistRef[];

  constructor(private aRoute: ActivatedRoute, private apiReference: ReferenceService,
              private apiProdRef: ProdRefService, private apiHistCode: HistCodeService,
              private apiRefCode: RefCodeService, private apiHistRef: HistRefService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.apiReference.getReferenceById(this.aRoute.snapshot.params['id']).subscribe(value => {
      this.reference = value;
      this.loadDataProdByRef();
      this.loadDataCodeByRef();
      this.loadDataHistRef();
      this.loadDataHistCode();
    });
  }

  loadDataProdByRef() {
    this.apiProdRef.getByReference(this.reference).subscribe(res => {
      this.prodRefs = res;
    });
  }

  loadDataCodeByRef() {
    this.apiRefCode.getByReference(this.reference).subscribe(res => {
      this.refCodes = res;
    });
  }

  loadDataHistCode() {
    this.apiHistCode.getHistCodeByRef(this.reference.id).subscribe( res => {
      this.histCodes = res;
    });
  }

  loadDataHistRef() {
    this.apiHistRef.getHistRefByRef(this.reference.id).subscribe( res => {
      this.histRefs = res;
    });
  }

  openEditDialog(ref: Reference): void {
    const dialogRef = this.dialog.open(ReferenceAddComponent, {
      width: '30%',
      data: {flag: 2, id: ref.id, nom: ref.nom , zone: ref.zone , statut: ref.statut , date_ajout: ref.date_ajout}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const ref1: Reference = new Reference();
        ref1.id = data.id;
        ref1.nom = data.nom;
        ref1.zone = data.zone;
        ref1.statut = data.statut;
        ref1.date_ajout = data.date_ajout;
        this.apiReference.addReference(ref1).subscribe(res => {
          if ( res.id ) {
            this.apiReference.getReferenceById(this.aRoute.snapshot.params['id']).subscribe(value => {
              this.reference = value;
            });
          }
        });
      }
    });
  }

  openAffectDialog() {
    const dialogRef = this.dialog.open(AddCodeDialogComponent, {
      width: '85%',
      data : {flag : 2}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const refCode: RefCode = new RefCode();
        refCode.reference = this.reference;
        refCode.code = data.code;
        refCode.date_attr = new Date();
        console.log(refCode);
        this.apiRefCode.addRefCode(refCode).subscribe(res => {
          this.loadDataCodeByRef();
        });
      }
    });
  }

  confirm_delete(element: RefCode) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {action: 'Code affecter a ce reference'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        console.log('delete is started!! ' + element.id);
        this.apiRefCode.deleteRefCode(element.id).subscribe(res => {
          this.loadDataCodeByRef();
          this.loadDataHistCode();
          this.loadDataHistRef();
        } );
        console.log('delete has been executed!!');
      }
    });
  }
}
