import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReferenceListComponent} from './reference-list/reference-list.component';
import {ReferenceDetailsComponent} from './reference-details/reference-details.component';


const routes: Routes = [{
  path : '',
  component : ReferenceListComponent
  },
  {
    path : 'references/details/:id',
    component : ReferenceDetailsComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferencesRoutingModule { }
