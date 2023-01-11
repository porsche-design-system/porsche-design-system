import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  template: `
    <select (change)="changeRoute($event.target.value)" style="font: revert; overflow-wrap: revert; hyphens: revert">
      <option disabled selected>Select a page</option>
      <ng-container *ngFor="let route of routes">
        <option [value]="route.path" [disabled]="route.isDisabled">{{ route.name }}</option>
      </ng-container>
    </select>
    <div id="app">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  public routes = routes.filter((route) => !!route.name);

  constructor(private router: Router) {}

  public async changeRoute(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }
}
