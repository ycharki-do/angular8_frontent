import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {Code} from '../../module/Code';
import {RefCode} from '../../module/RefCode';
import {RefCodeService} from '../../shared/ref-code.service';
import {CodeService} from '../../shared/code.service';
import {CodeAddComponent} from '../code-add/code-add.component';
import {HistCode} from '../../module/HistCode';
import {HistCodeService} from '../../shared/hist-code.service';

@Component({
  selector: 'app-code-details',
  templateUrl: './code-details.component.html',
  styleUrls: ['./code-details.component.css']
})
export class CodeDetailsComponent implements OnInit {


  code: Code;
  refCodes: RefCode[];
  histCodes: HistCode[];

  constructor(private aRoute: ActivatedRoute, private apiCode: CodeService,
              private apiRefCode: RefCodeService, private apiHistCode: HistCodeService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.apiCode.getById(this.aRoute.snapshot.params['id']).subscribe(value => {
      this.code = value;
      this.loadDataRefByCode();
      this.loadDataHistCode();
    });
  }

  loadDataRefByCode() {
    this.apiRefCode.getByCode(this.code).subscribe(res => {
      this.refCodes = res;
    });
  }

  loadDataHistCode() {
    this.apiHistCode.getHistCodeByCode(this.code.id).subscribe( res => {
      this.histCodes = res;
    });
  }

  openEditDialog(code: Code): void {
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
          this.apiCode.getById(this.aRoute.snapshot.params['id']).subscribe(value => {
            this.code = value;
            this.loadDataRefByCode();
            this.loadDataHistCode();
          });
        });
      }
    });
  }


}
