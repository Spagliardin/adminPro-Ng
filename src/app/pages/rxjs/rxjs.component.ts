import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {


  public intervalSubs: Subscription; 

  constructor() {
    // this.returnObservable()
    //   .pipe(retry())
    //   .subscribe(
    //     (value) => console.log('Subs:', value),
    //     (err) => console.warn('Error', err),
    //     () => console.info('Obs Terminado')
    //   );

    this.intervalSubs = this.returnInterval().subscribe((value) => console.log(value));
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe()
  }

  returnInterval() {
    return interval(500).pipe(
      take(10),
      map((value) => value + 1 ),
      filter( value => ( value % 2 === 0 ) ? true : false ),
    );
  }

  returnObservable() {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i Llego al 2');
        }
      }, 1000);
    });
    return obs$;
  }
}
