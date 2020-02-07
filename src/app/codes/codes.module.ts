import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodesRoutingModule } from './codes-routing.module';
import { CodeListComponent } from './code-list/code-list.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CodeAddComponent } from './code-add/code-add.component';
import { CodeDetailsComponent } from './code-details/code-details.component';
import { AddCodeDialogComponent } from './add-code-dialog/add-code-dialog.component';


@NgModule({
  declarations: [CodeListComponent, CodeAddComponent, CodeDetailsComponent, AddCodeDialogComponent],
  imports: [
    FormsModule,
    CommonModule,
    CodesRoutingModule,
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
  entryComponents: [CodeAddComponent, AddCodeDialogComponent]
})
export class CodesModule { }
