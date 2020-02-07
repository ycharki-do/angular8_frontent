import { Component, OnInit } from '@angular/core';
import {Product} from '../../module/Product';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Projet} from '../../module/Projet';
import {ProjetService} from '../../shared/projet.service';
import {ProjetAddComponent} from '../projet-add/projet-add.component';

@Component({
  selector: 'app-projet-details',
  templateUrl: './projet-details.component.html',
  styleUrls: ['./projet-details.component.css']
})
export class ProjetDetailsComponent implements OnInit {

  projet: Projet;

  constructor(private aRoute: ActivatedRoute, private apiProjet: ProjetService,
              private dialog: MatDialog) {  }

  ngOnInit() {
    this.apiProjet.getProjetById(this.aRoute.snapshot.params['id']).subscribe(value => {
      this.projet = value;
    });
  }

  openEditDialog(pr: Product): void {
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
          if ( res.id ) {
            this.apiProjet.getProjetById(res.id).subscribe(value => {
              this.projet = value;
            });
          }
        });
      }
    });
  }

}
