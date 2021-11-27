import { Component } from '@angular/core';
import { MultiDataSet } from 'ng2-charts';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})


export class Grafica1Component{

  public labels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']

  public labelsSales: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
  public labelsbuy: string[] = ['Download buy', 'In-Store buy', 'Mail-Order buy']
  public labelsMat: string[] = ['Mat', 'Store Mat', 'Mail mat']
  public labelsTall: string[] = ['Masst', 'Storde Mat', 'Maifl matf']

  public doughnutChartData: MultiDataSet = [
    [240, 560, 200],
  ];
  public doughnutChartSales: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartBuy: MultiDataSet = [
    [200, 400, 400],
  ];
  public doughnutChartTall: MultiDataSet = [
    [250, 250, 500],
  ];

}
