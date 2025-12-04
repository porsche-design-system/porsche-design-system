import { ChangeDetectionStrategy, Component, InjectionToken, inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from './app-routing.module';

export type Theme = 'light' | 'dark' | 'auto';
export const THEME_TOKEN = new InjectionToken<BehaviorSubject<Theme>>('pdsTheme');

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="!isWithinIFrame">
      <select name="route" [ngModel]="router.url.slice(1).split('/')[0]" (change)="changeRoute($event.target.value)">
        <option value="" disabled>Select a page</option>
        <option *ngFor="let route of routes" [value]="route.path" [disabled]="route.isDisabled">
          {{ route.name }}
        </option>
      </select>

      <select name="theme" [ngModel]="theme$ | async" (ngModelChange)="theme$.next($event)">
        <option *ngFor="let item of themes" [value]="item">{{ item }}</option>
      </select>
    </ng-container>

    <div id="app">
      <router-outlet />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppComponent {
  public router = inject(Router);
  public routes = routes.filter((route) => !!route.name);
  public themes: Theme[] = ['light', 'dark', 'auto'];
  public theme$ = inject(THEME_TOKEN); // equivalent to @Inject(THEME_TOKEN) in constructor

  isWithinIFrame: boolean = window.location !== window.parent.location;

  public async changeRoute(path: string): Promise<void> {
    await this.router.navigateByUrl(`/${path}`);
  }
}
