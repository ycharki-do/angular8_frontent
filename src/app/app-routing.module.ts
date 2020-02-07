import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProjetListComponent} from './projet/projet-list/projet-list.component';

const routes: Routes = [
  {
    path : 'products',
    component : ProductListComponent,
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path : 'references',
    loadChildren: './references/references.module#ReferencesModule'
  },
  {
    path : 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path : 'codes',
    loadChildren: './codes/codes.module#CodesModule'
  },
  {
    path : 'projets',
    component : ProjetListComponent,
    loadChildren : './projet/projet.module#ProjetModule'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch : 'full'
  }
];

@NgModule({
  imports : [ RouterModule.forRoot(routes)],
  exports : [ RouterModule]
})
export class AppRoutingModule {}
