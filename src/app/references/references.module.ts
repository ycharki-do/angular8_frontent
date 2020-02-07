import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule, MatCheckboxModule,
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
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';

import { ReferencesRoutingModule } from './references-routing.module';
import { ReferenceListComponent } from './reference-list/reference-list.component';
import { ReferenceAddComponent } from './reference-add/reference-add.component';
import { AddRefDialogComponent } from './add-ref-dialog/add-ref-dialog.component';
import { ReferenceDetailsComponent } from './reference-details/reference-details.component';
import {CodeStatusPipe} from '../shared/CodeStatus.Pipe';



@NgModule({
  declarations: [ReferenceListComponent,
    ReferenceAddComponent,
    AddRefDialogComponent,
    ReferenceDetailsComponent,
    CodeStatusPipe],
  imports: [
    FormsModule,
    CommonModule,
    ReferencesRoutingModule,
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
    MatCheckboxModule,
    MatSelectModule
  ],
  entryComponents: [ReferenceAddComponent, AddRefDialogComponent]
})
export class ReferencesModule { }
