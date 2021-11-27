import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})

export class DoughnutComponent{

  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];

  public colors: Color[] = [
    { backgroundColor: [ '#9E120E', '#FF5800', '#FFb414' ] }
  ]

  @Input() title: string = 'Sin Titulo'
  @Input() labels: Label[] = this.doughnutChartLabels
  @Input() data: MultiDataSet = this.doughnutChartData


}
