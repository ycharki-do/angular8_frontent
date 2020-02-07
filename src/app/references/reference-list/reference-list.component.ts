import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Reference} from '../../module/Reference';
import {ReferenceService} from '../../shared/reference.service';
import {ReferenceAddComponent} from '../reference-add/reference-add.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {AddRefDialogComponent} from '../add-ref-dialog/add-ref-dialog.component';

@Component({
  selector: 'app-reference-list',
  templateUrl: './reference-list.component.html',
  styleUrls: ['./reference-list.component.css']
})
export class ReferenceListComponent implements OnInit {
  @Input() onDialog = false;
  title = 'Reference';
  selectedRed: Reference;
  private references: Reference[] = new Array<Reference>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // private dialog : MatDialog;
  dataSource: MatTableDataSource<Reference>;
  displayedColumns: string[];
  searchKey: string;

  constructor(private apiReference: ReferenceService,
              private dialog: MatDialog) {
      this.displayedColumns = ['id', 'nom', 'zone', 'date_ajout', 'statut', 'actions'];
  }


  ngOnInit() {
    if ( this.onDialog ) {
      this.title = 'Selected Ref : ';
      this.displayedColumns = ['id', 'nom', 'zone', 'date_ajout', 'statut'];
      this.apiReference.getFreeReference().subscribe(res => {
        this.references = res;
        this.dataSource = new MatTableDataSource(this.references);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.apiReference.getAllReference().subscribe(res => {
        this.references = res;
        this.dataSource = new MatTableDataSource(this.references);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  loadData() {
    this.apiReference.getAllReference().subscribe(res => {
      this.references = res;
      this.dataSource.data = this.references;
    });
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey;
  }

  onSearchClick() {
    this.searchKey = '';
    this.dataSource.filter = this.searchKey;
  }


  openAddDialog() {
    const dialogRef = this.dialog.open(ReferenceAddComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const ref: Reference = new Reference();
        ref.nom = data.nom;
        ref.zone = data.zone;
        ref.statut = data.statut;
        ref.date_ajout = data.date_ajout;
        this.apiReference.addReference(ref).subscribe(res => {
          this.loadData();
        });
      }
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
          this.loadData();
        });
      }
    });
  }

  confirm_delete(ref: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {action: 'Reference'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        this.apiReference.deleteReference(ref.id).subscribe(res => {
          this.loadData();
        });
      }
    });
  }

  rowSelected(row: Reference) {
    this.selectedRed = row;
    AddRefDialogComponent.staticRef = row;
    console.log(row);
  }


}
