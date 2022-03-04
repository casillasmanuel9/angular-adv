import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, Subscriber, Subscription, interval, take, map, filter } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor() {

    /* this.subscription = this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      {
        next: (valor) => console.log('subs', valor),
        error: (error) => console.log('subs', error),
        complete: () => console.log('Complete')
      }
    ); */

    this.subscription = this.retornIntervalo().subscribe(console.log);



  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornIntervalo(): Observable<number> {
    return interval(1000).pipe(
      take(10),
      map(valor => valor + 1),
      filter((valor) => valor % 2 === 0),
    );
  }

  retornaObservable() {
    let i = 0;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        observer.next(i++);

        if(i >= 10) {
          clearInterval(intervalo)
          observer.complete();
        }

        if(i === 4) {
          observer.error('i llego al valor de 4');
        }
      }, 1000)
    });
  }

}
