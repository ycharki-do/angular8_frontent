import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import {
  MatButtonModule, MatCardModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './product.service';
import { ProductAddComponent } from './product-add/product-add.component';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {CdkDetailRowDirective} from '../shared/cdk-detail-row.directive';
import {AddRefDialogComponent} from '../references/add-ref-dialog/add-ref-dialog.component';


@NgModule({
  declarations: [ProductListComponent, ProductAddComponent, ProductDetailsComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatCardModule,
    MatSelectModule
  ],
  providers : [ProductService],
  entryComponents : [ProductAddComponent]
})
export class ProductsModule { }
