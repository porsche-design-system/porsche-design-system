import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-frosted-glass-example',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      // Wrapper
      .wrapper {
        display: flex;
        justify-content: center;
        padding: $pds-spacing-fluid-medium;
        background: radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
      }

      // Frosted Glass
      .frosted-glass {
        @include pds-text-small;
        @include pds-frosted-glass;
        color: $pds-theme-dark-primary;
        background: $pds-theme-light-state-hover;
        border-radius: $pds-border-radius-large;
        padding: $pds-spacing-fluid-medium;
      }
    `,
  ],
  template: `
    <div class="wrapper">
      <div class="frosted-glass">Frosted Glass</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesFrostedGlassExampleComponent {}
