import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ProductListComponent} from './products/product-list/product-list.component';
import {ProductsModule} from './products/products.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import {ReferencesModule} from './references/references.module';
import { ProjetListComponent } from './projet/projet-list/projet-list.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import {CodeListComponent} from './codes/code-list/code-list.component';
import {CodesModule} from './codes/codes.module';
import {ProjetModule} from './projet/projet.module';
import { InfoDialogComponent } from './shared/info-dialog/info-dialog.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {CodeStatusPipe} from './shared/CodeStatus.Pipe';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    InfoDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Routing
    AppRoutingModule,
    // material declarations
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatAutocompleteModule,
    // Modules App
    ProductsModule,
    ReferencesModule,
    CodesModule,
    ProjetModule,
    DashboardModule
    // charts moduls
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, InfoDialogComponent]
})
export class AppModule { }
