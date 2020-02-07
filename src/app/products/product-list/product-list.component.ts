import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource, MatPaginator} from '@angular/material';
import { Router} from '@angular/router';
import {Product} from '../../module/Product';
import {ProductService} from '../product.service';
import {ProductAddComponent} from '../product-add/product-add.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {

  private products: Product[] = new Array<Product>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // private dialog : MatDialog;
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['id', 'projet', 'nom', 'created', 'actions'];
  searchKey: string;

  constructor(private apiProduct: ProductService, private route: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.apiProduct.getAllProduct().subscribe(res => {
      this.products = res;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log('list' + this.products[2].projet.nom);
    });
  }

  loadData() {
    this.apiProduct.getAllProduct().subscribe(res => {
      this.products = res;
      this.dataSource.data = this.products;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '30%',
      data: {flag: 1}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const pr: Product = new Product();
        pr.nom = data.nom;
        pr.date_ajout = data.date_ajout;
        pr.projet = data.projet;
        this.apiProduct.addProduct(pr).subscribe(res => {
          console.log('this work 1', res);
          this.loadData();
        });
      }
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
        this.apiProduct.addProduct(pr1).subscribe(res => {
          console.log('this work ', res);
          this.loadData();
        });
      }
    });
  }

  confirm_delete(pr: Product) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {action: 'Produit'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        this.apiProduct.deleteProduct(pr.id).subscribe(res => {
          console.log('this work 1', res);
          this.loadData();
        });
      }
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey;
  }

  onSearchClick() {
    this.searchKey = '';
    this.dataSource.filter = this.searchKey;
  }

}

