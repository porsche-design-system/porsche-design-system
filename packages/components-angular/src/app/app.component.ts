import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { type Theme, THEME_TOKEN } from '@porsche-design-system/components-angular';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  template: `
    <select [ngModel]="router.url.slice(1)" (change)="changeRoute($event.target.value)">
      <option value="" disabled>Select a page</option>
      <option *ngFor="let route of routes" [value]="route.path" [disabled]="route.isDisabled">{{ route.name }}</option>
    </select>

    <select [ngModel]="theme$ | async" (ngModelChange)="theme$.next($event)">
      <option *ngFor="let item of themes" [value]="item">{{ item }}</option>
    </select>

    <div id="app">
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public router = inject(Router);
  public routes = routes.filter((route) => !!route.name);
  public themes: Theme[] = ['light', 'dark', 'auto'];
  public theme$ = inject(THEME_TOKEN);

  public async changeRoute(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }
}
