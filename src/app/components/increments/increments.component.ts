import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-increments',
  templateUrl: './increments.component.html',
  styles: [
  ]
})
export class IncrementsComponent implements OnInit{

  ngOnInit(){
    this.btnClass = ` btn ${ this.btnClass } `
  }

  @Input() progress: number = 0
  @Input() btnClass: string = 'btn-primary'

  @Output() exitValue: EventEmitter<number> = new EventEmitter();

  get getPercentaje() {
    return ` ${this.progress}% `
  }

  changeValue( value: number ){

    if (this.progress >= 100 && value >= 0) {
      this.exitValue.emit( 100 )
      return this.progress = 100
    }

    if (this.progress <= 0 && value < 0) {
      this.exitValue.emit( 0 )
      return this.progress = 0
    }

    this.exitValue.emit( this.progress )
    return this.progress += value
  
  }

  onChange( event: number ) {
    
    if (event >= 100) {
      this.progress = 100
    }
    else if ( event <= 0 ){
      this.progress = 0
    } 
    else {
      this.progress = event
    }
    
    this.exitValue.emit( this.progress )
  }

}
