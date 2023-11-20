import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { THEME_TOKEN } from '@porsche-design-system/components-angular';

@Component({
  selector: 'page-theme-injection',
  template: `
    <div class="playground light">
      <p-button [theme]="'light'" (click)="theme$.next('light')">Light Button</p-button>
      <p-button [theme]="'dark'" (click)="theme$.next('dark')">Dark Button</p-button>
      <br />
      <p-button (click)="isVisible = !isVisible">Show/Hide Button</p-button>
      <p-button *ngIf="isVisible">Global Theme</p-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeInjectionComponent {
  theme$ = inject(THEME_TOKEN);
  isVisible = false;
}
