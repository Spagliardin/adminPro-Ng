import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css' ]
})
export class ProgressComponent{

  progress: number = 50

  get getPercentaje() {
    return ` ${this.progress}% `
  }

  changeValue( valor: number ){

    if (this.progress >= 100 && valor >= 0) {
      return this.progress = 100
    }
    if (this.progress <= 0 && valor < 0) {
      return this.progress = 0
    }

    return this.progress = this.progress + valor
  }


}
