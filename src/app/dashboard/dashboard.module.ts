import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardListComponent} from './dashboard-list/dashboard-list.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { QuickAddComponent } from './quick-add/quick-add.component';



@NgModule({
  declarations: [DashboardListComponent, BarChartComponent, DoughnutChartComponent, RadarChartComponent, PieChartComponent, QuickAddComponent],
  imports: [
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
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
    MatMenuModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSelectModule,
    // Charts Module
    ChartsModule
  ],
  entryComponents: [QuickAddComponent]
})
export class DashboardModule { }
