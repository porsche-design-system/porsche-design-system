import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import type { BehaviorSubject } from 'rxjs';
import { type Theme, THEME_TOKEN } from '@porsche-design-system/components-angular';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  template: `
    <select [value]="router.url.slice(1)" (change)="changeRoute($event.target.value)">
      <option value="" disabled>Select a page</option>
      <ng-container *ngFor="let route of routes">
        <option [value]="route.path" [disabled]="route.isDisabled">{{ route.name }}</option>
      </ng-container>
    </select>

    <select [value]="themeSubject | async" (change)="changeTheme($event.target.value)">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Auto</option>
    </select>

    <div id="app">
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public routes = routes.filter((route) => !!route.name);

  constructor(
    public router: Router,
    @Inject(THEME_TOKEN) public themeSubject: BehaviorSubject<Theme>
  ) {}

  public async changeRoute(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }

  public changeTheme(theme: Theme): void {
    this.themeSubject.next(theme);
  }
}
