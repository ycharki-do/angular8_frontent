import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CodeListComponent} from './code-list/code-list.component';
import {CodeDetailsComponent} from './code-details/code-details.component';


const routes: Routes = [{
  path : '',
  component : CodeListComponent
  },
  {
    path : 'codes/details/:id',
    component : CodeDetailsComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodesRoutingModule { }
