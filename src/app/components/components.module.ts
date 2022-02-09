import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementsComponent } from './increments/increments.component';
import { FormsModule } from "@angular/forms";
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';


@NgModule({
  declarations: [
    IncrementsComponent,
    DoughnutComponent,
    ModalImageComponent,
  ],
  exports: [
    DoughnutComponent,
    IncrementsComponent,
    ModalImageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
