import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-motion-moving-example',
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
        width: 50px;
        height: 50px;
        transition-duration: $pds-motion-duration-short;
        transition-timing-function: $pds-motion-easing-base;
        transform: translateX(-200px);
      }

      .active {
        transform: translateX(200px);
      }
    `,
  ],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Moving</h3>
        <div class="tile" (click)="onClick($event)"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesMotionMovingExampleComponent {
  onClick = (e: MouseEvent): void => {
    (e.target as HTMLDivElement).classList.toggle('active');
  };
}
