import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  template: `
    <select (change)="changeRoute($event.target.value)">
      <option disabled selected>Select a page</option>
      <ng-container *ngFor="let route of routes">
        <option [value]="route.path">{{ route.name }}</option>
      </ng-container>
    </select>
    <div id="app">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  public routes = routes.filter((x) => !!x.name);

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  public async changeRoute(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }
}
