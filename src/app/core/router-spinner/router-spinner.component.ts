import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-router-spinner',
  templateUrl: './router-spinner.component.html',
  styleUrls: ['./router-spinner.component.scss'],
})
export class RouterSpinnerComponent implements OnInit {
  routerLoading$: Observable<boolean> = of(false);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerLoading$ = this.router.events.pipe(
      filter(e => {
        return (
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        );
      }),
      map(e => e instanceof NavigationStart)
    );
  }
}
