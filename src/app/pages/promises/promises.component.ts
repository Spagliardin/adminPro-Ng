import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: [],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
    this.getUsers().then( users => console.log(users) )


    // const promise = new Promise((resolve, reject) => {
    //   if (true) {
    //     resolve('Hola Mundo');
    //   }
    //   // else{
    //   //   reject('algo salio Mal')
    //   // }
    // });

    // promise.then((msje) => {
    //   console.log(msje);
    // });

    // console.log('Fin del Init');
  }

  getUsers(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolve(body.data) )
    });
  }


}
