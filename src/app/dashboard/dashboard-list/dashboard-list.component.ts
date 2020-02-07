import {Component, OnInit, ViewChild} from '@angular/core';
import {Projet} from '../../module/Projet';
import {MatCheckbox, MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProdRef} from '../../module/ProdRef';
import {RefCode} from '../../module/RefCode';
import {FullModel} from '../../module/FullModel';
import {ProdRefService} from '../../shared/prod-ref.service';
import {DashboardService} from '../dashboard.service';
import {ExcelService} from '../../shared/excel.service';
import {ExcelRow} from '../../module/ExcelRow';
import {ProductAddComponent} from '../../products/product-add/product-add.component';
import {QuickAddComponent} from '../quick-add/quick-add.component';


@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})

export class DashboardListComponent implements OnInit {
  checkAll = false;
  filtredStings: string[] = new Array<string>();
  list: FullModel[];
  listProjet: Projet[];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // private dialog : MatDialog;
  dataSource: MatTableDataSource<FullModel>;
  displayedColumns: string[] = ['code', 'status', 'project', 'board', 'itac', 'type'];
  searchKey: string;
  pieChart = true;
  barChart = true;

  constructor(private apiProdRef: ProdRefService, private apiDashboard: DashboardService,
              private excelService: ExcelService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
    this.apiDashboard.getAllProjet().subscribe(res => {
      this.listProjet = res;
    });
  }

  loadData () {
    this.apiProdRef.getAll().subscribe(res => {
      this.list = res;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  filter_data() {
    this.dataSource = new MatTableDataSource(this.list.filter(value => {
      return value.prodRef.produit.projet.nom === 'SDS';
    }));
    console.log('filter applied');
  }

  onSearchClick() {
    this.searchKey = '';
    this.dataSource.filter = this.searchKey;
  }

  checkall(element: any) {
    this.checkAll = !this.checkAll;
    const checkBox: MatCheckbox = element;
    if (!checkBox.checked) {
      this.listProjet.forEach(value => {
        this.filtredStings.push(value.nom);
      });
    } else {
      this.filtredStings = new Array<string>();
    }
    this.filter_options();
  }

  applyFilter(val: Projet, element: any) {
    const checkBox: MatCheckbox = element;
    if (!checkBox.checked) {
      this.filtredStings.push(val.nom);
      this.filter_options();
    } else {
      this.filtredStings = this.filtredStings.filter(value => {
        return value !== val.nom;
      });
      this.filter_options();
    }
  }

  filter_options() {
    this.dataSource = new MatTableDataSource(this.list.filter( value => {
      let flag = false;
      let i = 0;
      for (i ; this.filtredStings.length > i ; i++ ) {
        flag = value.prodRef.produit.projet.nom === this.filtredStings[i];
        if ( flag ) {
          console.log(flag + '----' + this.filtredStings[i]);
          break ;
        }
      }
      return flag;
    }));
    if ( this.filtredStings.length === 0 ) {
      this.dataSource = new MatTableDataSource(this.list);
    }
  }

  generate_excel() {
    const json = new Array<any>();
    this.list.forEach( value => {
      const data: ExcelRow = new ExcelRow();
      data.code = value.refCode.code.numero;
      data.statut = value.refCode.code.statut;
      data.itac = value.refCode.reference ? value.refCode.reference.nom : '';
      data.type = value.refCode.reference ? value.refCode.reference.zone : '';
      data.projet = value.prodRef.produit ? value.prodRef.produit.projet.nom : '';
      data.board = value.prodRef.produit ? value.prodRef.produit.nom : '';
      json.push(data);
    });
    console.log(json);
    this.excelService.exportAsExcelFile(json, 'file');
  }

  openQuickAddDialog() {
    const dialogRef = this.dialog.open(QuickAddComponent, {
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        this.loadData();
      }
    });
  }
}
