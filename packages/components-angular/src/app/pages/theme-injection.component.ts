import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-theme-injection',
  template: `
    <div class="playground light">
      <p-button [theme]="'light'">Light Button</p-button>
      <p-button [theme]="'dark'">Dark Button</p-button>
      <br />
      <p-button (click)="isVisible = !isVisible">Show/Hide Button</p-button>
      @if (isVisible) {
        <p-button>Global Theme</p-button>
      }
    </div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ThemeInjectionComponent {
  isVisible = false;
}
