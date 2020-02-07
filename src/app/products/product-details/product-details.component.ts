import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../product.service';
import {Product} from '../../module/Product';
import {ProductAddComponent} from '../product-add/product-add.component';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {Reference} from '../../module/Reference';
import {ReferenceService} from '../../shared/reference.service';
import {AddRefDialogComponent} from '../../references/add-ref-dialog/add-ref-dialog.component';
import {ProdRefService} from '../../shared/prod-ref.service';
import {ProdRef} from '../../module/ProdRef';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {HistRef} from '../../module/HistRef';
import {HistRefService} from '../../shared/hist-ref.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  prodRefs: ProdRef[];
  histRefs: HistRef[];
  produit: Product;
  displayedColumns = ['id', 'nom', 'zone', 'date_ajout', 'statut'];
  dataSource: MatTableDataSource<ProdRef>;
  private references: Reference[];

  constructor(private aRoute: ActivatedRoute, private apiProduit: ProductService, private apiProdRef: ProdRefService,
              private dialog: MatDialog, private apiReference: ReferenceService, private apiHistRef: HistRefService) {  }

  ngOnInit() {
    this.apiProduit.getProductById(this.aRoute.snapshot.params['id']).subscribe(value => {
      this.produit = value;
      this.loadDataRefByProd();
      this.loadDataHistRef();
    });
  }

  loadDataRefByProd() {
    this.apiProdRef.getByProduit(this.produit).subscribe(res => {
      this.prodRefs = res;
      this.dataSource = new MatTableDataSource(this.prodRefs);
    });
  }

  loadDataHistRef() {
      this.apiHistRef.getHistRefByProduit(this.produit.id).subscribe(res => {
        this.histRefs = res;
      });
  }

  openEditDialog(pr: Product): void {
    console.log('edit ' + pr.projet);
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '30%',
      data: {flag: 2, id: pr.id, projet: pr.projet , nom: pr.nom , date_ajout: pr.date_ajout}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const pr1: Product = new Product();
        pr1.id = data.id;
        pr1.nom = data.nom;
        pr1.date_ajout = data.date_ajout;
        pr1.projet = data.projet;
        this.apiProduit.addProduct(pr1).subscribe(res => {
          this.produit.nom = res.nom;
          this.produit.date_ajout = res.date_ajout;
          this.produit.projet = res.projet;
        });
      }
    });
  }

  openAffectDialog(): void {
    const dialogRef = this.dialog.open(AddRefDialogComponent, {
      width: '85%',
      data : {flag : 2}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data.reference ) {
        const prodRef: ProdRef = new ProdRef();
        prodRef.produit = this.produit;
        prodRef.reference = data.reference;
        prodRef.date_attr = new Date();
        console.log(prodRef);
        this.apiProdRef.addProdRef(prodRef).subscribe(res => {
          this.loadDataRefByProd();
        });
      }
    });
  }


  confirm_delete(prodRef: ProdRef) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {action: 'Reference de Produit'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        console.log('delete is started!! ' + prodRef.id);
        this.apiProdRef.deleteProdRef(prodRef.id).subscribe(res => {
          this.loadDataRefByProd();
          this.loadDataHistRef();
        } );
        console.log('delete has been executed!!');
      }
    });
  }
}
