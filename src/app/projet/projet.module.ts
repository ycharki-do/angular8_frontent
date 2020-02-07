import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetAddComponent } from './projet-add/projet-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatChipsModule,
  MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSortModule, MatTableModule,
  MatTabsModule
} from '@angular/material';
import {ProjetsRoutingModule} from './projets-routing.module';
import {ProjetListComponent} from './projet-list/projet-list.component';
import {ConfirmDialogComponent} from '../shared/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from '../shared/info-dialog/info-dialog.component';
import { ProjetDetailsComponent } from './projet-details/projet-details.component';



@NgModule({
  declarations: [ProjetListComponent, ProjetAddComponent, ProjetDetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    ProjetsRoutingModule,
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
    MatMenuModule
  ],
  entryComponents : [ProjetAddComponent]
})
export class ProjetModule { }
