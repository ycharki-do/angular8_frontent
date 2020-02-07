import {Component, OnInit, ViewChild} from '@angular/core';
import {Code} from '../../module/Code';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CodeService} from '../../shared/code.service';
import {CodeAddComponent} from '../../codes/code-add/code-add.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {Projet} from '../../module/Projet';
import {ProjetService} from '../../shared/projet.service';
import {ProjetAddComponent} from '../projet-add/projet-add.component';
import {InfoDialogComponent} from '../../shared/info-dialog/info-dialog.component';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent implements OnInit {
  
  private projets: Projet[] = new Array<Projet>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // private dialog : MatDialog;
  dataSource: MatTableDataSource<Projet>;
  displayedColumns: string[] = ['id', 'nom', 'date_ajout', 'pr_number', 'actions'];
  searchKey: string;

  constructor(private apiProjet: ProjetService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.apiProjet.getAllProjet().subscribe(res => {
      this.projets = res;
      this.dataSource = new MatTableDataSource(this.projets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(this.projets);
    });
  }

  loadData() {
    this.apiProjet.getAllProjet().subscribe(res => {
      this.projets = res;
      this.dataSource.data = this.projets;
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ProjetAddComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const projet: Projet = new Projet();
        projet.nom = data.nom;
        projet.date_ajout = data.date_ajout;
        this.apiProjet.addProjet(projet).subscribe(res => {
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

  confirm_delete(pr: Projet) {
    if ( pr.produits.length !== 0 ) {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '30%',
        height: '50%',
        data: {message: 'Vous ne pouvez pas supprimer ce projet!!', subMessage: 'Ce projet a deja des produits'}
      });
      dialogRef.afterClosed().subscribe(data => {
        if ( data ) {
          this.apiProjet.deleteProjet(pr.id).subscribe(res => {
            this.loadData();
          });
        }
      });
        } else {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '30%',
            data: {action: 'Projet'}
          });
          dialogRef.afterClosed().subscribe(data => {
            if ( data ) {
              this.apiProjet.deleteProjet(pr.id).subscribe(res => {
                this.loadData();
              });
            }
          });
        }
  }

  openEditDialog(pr: Projet) {
    const dialogRef = this.dialog.open(ProjetAddComponent, {
      width: '30%',
      data: {flag: 2, id: pr.id, nom: pr.nom , date_ajout: pr.date_ajout}
    });
    dialogRef.afterClosed().subscribe(data => {
      if ( data ) {
        const projet: Projet = new Projet();
        projet.id = data.id;
        projet.nom = data.nom;
        projet.date_ajout = data.date_ajout;
        this.apiProjet.updateProjet(projet).subscribe(res => {
          this.loadData();
        });
      }
    });
  }

}
