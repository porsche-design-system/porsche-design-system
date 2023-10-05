import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-motion-enter-exit-example',
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
        height: 100px;
        transition-duration: $pds-motion-duration-moderate;
        transition-timing-function: $pds-motion-easing-in;
        transform: translateY(0px);
      }

      .active {
        transition-duration: $pds-motion-duration-short;
        transition-timing-function: $pds-motion-easing-out;
        transform: translateY(40%);
        opacity: 0;
      }
    `,
  ],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Enter / Exit</h3>
        <div class="tile" (click)="onClick($event)"></div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesMotionEnterExitExampleComponent {
  onClick = (e: MouseEvent): void => {
    (e.target as HTMLDivElement).classList.toggle('active');
  };
}
