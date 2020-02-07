import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  public pieChartLabels = ['Projets', 'Produits', 'References', 'Codes'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';
  constructor(private apiDashboard: DashboardService) { }
  ngOnInit() {
    this.apiDashboard.getAllProjet().subscribe(res => {
      this.pieChartData[0] = res.length;
    });
    this.apiDashboard.getAllProduct().subscribe(res => {
      this.pieChartData[1] = res.length;
    });
    this.apiDashboard.getAllReference().subscribe(res => {
      this.pieChartData[2] = res.length;
    });
    this.apiDashboard.getAllCode().subscribe(res => {
      this.pieChartData[3] = res.length;
    });
  }
}
