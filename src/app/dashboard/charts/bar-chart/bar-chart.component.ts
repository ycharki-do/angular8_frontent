import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../dashboard.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private apiDashboard: DashboardService) { }
  loaded = false;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2017', '2018', '2019'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [0, 0, 0], label: 'Projets'},
    {data: [0, 0, 0], label: 'Produits'},
    {data: [0, 0, 0], label: 'References'},
    {data: [0, 0, 0], label: 'Codes'}
  ];
  ngOnInit() {
    this.pieProjets();
    this.pieProduits();
    this.pieReferences();
    this.pieCodes();
  }

  pieProjets(){
    this.apiDashboard.getAllProjet().subscribe(res => {
      const res0 = res;
      const res1 = res;
      const res2 = res;
      this.barChartData[0].data[0] = res0.filter(value => {
        console.log(value.date_ajout.search('2019'));
        console.log(value.date_ajout);
        if (value.date_ajout.search('2017') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[0].data[1] = res1.filter(value => {
        if (value.date_ajout.search('2018') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[0].data[2] = res2.filter(value => {
        if (value.date_ajout.search('2019') === 0) { return true; } else { return false; }
      }).length;
    });
  }
  pieProduits(){
    this.apiDashboard.getAllProduct().subscribe(res => {
      const res0 = res;
      const res1 = res;
      const res2 = res;
      this.barChartData[1].data[0] = res0.filter(value => {
        console.log(value.date_ajout.search('2019'));
        console.log(value.date_ajout);
        if (value.date_ajout.search('2017') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[1].data[1] = res1.filter(value => {
        if (value.date_ajout.search('2018') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[1].data[2] = res2.filter(value => {
        if (value.date_ajout.search('2019') === 0) { return true; } else { return false; }
      }).length;
    });
  }
  pieReferences(){
    this.apiDashboard.getAllReference().subscribe(res => {
      const res0 = res;
      const res1 = res;
      const res2 = res;
      this.barChartData[2].data[0] = res0.filter(value => {
        console.log(value.date_ajout.search('2019'));
        console.log(value.date_ajout);
        if (value.date_ajout.search('2017') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[2].data[1] = res1.filter(value => {
        if (value.date_ajout.search('2018') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[2].data[2] = res2.filter(value => {
        if (value.date_ajout.search('2019') === 0) { return true; } else { return false; }
      }).length;
    });
  }
  pieCodes(){
    this.apiDashboard.getAllCode().subscribe(res => {
      const res0 = res;
      const res1 = res;
      const res2 = res;
      this.barChartData[3].data[0] = res0.filter(value => {
        console.log(value.date_attr.search('2019'));
        console.log(value.date_attr);
        if (value.date_attr.search('2017') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[3].data[1] = res1.filter(value => {
        if (value.date_attr.search('2018') === 0) { return true; } else { return false; }
      }).length;
      this.barChartData[3].data[2] = res2.filter(value => {
        if (value.date_attr.search('2019') === 0) { return true; } else { return false; }
      }).length;
      this.loaded = true;
    });
  }
}
