import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Reference} from '../../module/Reference';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Code} from '../../module/Code';
import {CodeService} from '../../shared/code.service';
import {ReferenceAddComponent} from '../../references/reference-add/reference-add.component';
import {CodeAddComponent} from '../code-add/code-add.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css']
})
export class CodeListComponent implements OnInit {

  // On dialog treatement
  @Input() onDialog = false;
  @Output() selectedCode: EventEmitter<Code> = new EventEmitter();
  selectedCodeValue: Code;
  //
  private codes: Code[] = new Array<Code>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // private dialog : MatDialog;
  dataSource: MatTableDataSource<Code>;
  displayedColumns: string[] = ['id', 'numero', 'statut', 'date_attr', 'actions'];
  searchKey: string;
  statut: number;
  statusChoose = [
    {value: 1 , valueView: 'Temp'},
    {value: 2 , valueView: 'Busy'},
  ];

  constructor(private apiCode: CodeService,
              private dialog: MatDialog) { }

  ngOnInit() {
    if ( !this.onDialog ) {
      this.apiCode.getAllCodes().subscribe(res => {
        this.codes = res;
        this.dataSource = new MatTableDataSource(this.codes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.apiCode.getFreeCodes().subscribe(res => {
        this.codes = res;
        this.dataSource = new MatTableDataSource(this.codes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  loadData() {
    this.apiCode.getAllCodes().subscribe(res => {
      this.codes = res;
      this.dataSource.data = this.codes;
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CodeAddComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const code: Code = new Code();
        code.numero = data.numero;
        code.statut = data.statut;
        code.date_attr = data.date_attr;
        this.apiCode.getAddCode(code).subscribe(res => {
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


  confirm_delete(code: Code) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '30%',
      data: {action: 'Reference'}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        this.apiCode.deleteCode(code.id).subscribe(res => {
          this.loadData();
        });
      }
    });
  }

  openEditDialog(code: Code) {
    const dialogRef = this.dialog.open(CodeAddComponent, {
      width: '30%',
      data: {flag: 2, id: code.id, numero: code.numero , statut: code.statut , date_attr: code.date_attr}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const cd: Code = new Code();
        cd.id = data.id;
        cd.numero = data.numero;
        cd.statut = data.statut;
        cd.date_attr = data.date_attr;
        this.apiCode.getAddCode(cd).subscribe(res => {
          this.loadData();
        });
      }
    });
  }

  selectedTableRow(code: Code) {
    this.selectedCode.emit(code);
    this.selectedCodeValue = code;
  }
}
