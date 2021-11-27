import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementsComponent } from './increments/increments.component';
import { FormsModule } from "@angular/forms";
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementsComponent,
    DoughnutComponent,
  ],
  exports: [
    DoughnutComponent,
    IncrementsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
