import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-drop-shadow-example',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      // Wrapper
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: $pds-grid-gap;
        padding: $pds-spacing-fluid-medium;
      }

      // Typography
      .heading {
        @include pds-heading-medium;
        color: $pds-theme-light-primary;
        text-align: center;
        width: 100%;
        margin: 0;
      }

      // Tile
      .tile {
        @include pds-text-small;
        color: $pds-theme-light-primary;
        background: $pds-theme-light-background-surface;
        padding: $pds-spacing-fluid-medium;
        border-radius: $pds-border-radius-large;
      }

      // Drop Shadow
      .drop-shadow-low {
        @include pds-drop-shadow-low;
      }

      .drop-shadow-medium {
        @include pds-drop-shadow-medium;
      }

      .drop-shadow-high {
        @include pds-drop-shadow-high;
      }
    `,
  ],
  template: `
    <div class="wrapper">
      <h3 class="heading">Drop Shadow</h3>
      <div class="drop-shadow-low tile">Low</div>
      <div class="drop-shadow-medium tile">Medium</div>
      <div class="drop-shadow-high tile">High</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesDropShadowExampleComponent {}
