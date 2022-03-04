import { filter, map, Subscription } from 'rxjs';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Component, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = '';
  private subs: Subscription;

  constructor(
    private router: Router,
    private render2: Renderer2
  ) {
    this.subs = this.getArguementosRuta().subscribe(({titulo}) => {
      this.titulo = titulo;
      this.render2.setProperty(document, 'title', `AdminPro - ${titulo}`);
    });;
  }

  getArguementosRuta() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter(event => (event as ActivationEnd).snapshot.firstChild === null),
      map((event) => (event as ActivationEnd).snapshot.data)
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
