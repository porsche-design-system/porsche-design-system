import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-motion-expand-example',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      // Wrapper
      .wrapper {
        display: flex;
        gap: $pds-grid-gap;
        padding: $pds-spacing-fluid-medium;
        flex-wrap: wrap;
        justify-content: center;
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
        color: $pds-theme-light-primary;
        background: $pds-theme-light-background-surface;
        border-radius: $pds-border-radius-large;
        cursor: pointer;
        width: 200px;
        height: 40px;
        transition: height;
        transition-duration: $pds-motion-duration-short;
        transition-timing-function: $pds-motion-easing-in;
      }

      .active {
        height: 160px;
        transition: height;
        transition-duration: $pds-motion-duration-moderate;
        transition-timing-function: $pds-motion-easing-base;
      }
    `,
  ],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Expand</h3>
        <div class="tile" (click)="onClick($event)"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesMotionExpandExampleComponent {
  onClick = (e: MouseEvent): void => {
    (e.target as HTMLDivElement).classList.toggle('active');
  };
}
