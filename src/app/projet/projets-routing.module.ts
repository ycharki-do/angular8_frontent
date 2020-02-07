import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjetListComponent} from './projet-list/projet-list.component';
import {ProjetDetailsComponent} from './projet-details/projet-details.component';


const routes: Routes = [{
  path : '',
  component : ProjetListComponent
  },
  {
    path : 'projets/details/:id',
    component : ProjetDetailsComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetsRoutingModule { }
