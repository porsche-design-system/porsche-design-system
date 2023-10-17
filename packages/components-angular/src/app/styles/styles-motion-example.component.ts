import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-motion-example',
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
      }

      // Tile
      .tile {
        @include pds-text-small;
        width: 200px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: $pds-theme-light-primary;
        background: $pds-theme-light-background-surface;
        border-radius: $pds-border-radius-large;
        cursor: pointer;

        &--moving {
          transform: translateX(-200px);
          transition: transform $pds-motion-duration-short $pds-motion-easing-base;

          &--active {
            transform: translateX(200px);
          }
        }

        &--enter-exit {
          transform: translateY(0px);
          transition-property: opacity, transform;
          transition-duration: $pds-motion-duration-moderate;
          transition-timing-function: $pds-motion-easing-in;

          &--active {
            opacity: 0;
            transform: translateY(40%);
            transition-property: opacity, transform;
            transition-duration: $pds-motion-duration-short;
            transition-timing-function: $pds-motion-easing-out;
          }
        }

        &--show-hide {
          transition: opacity $pds-motion-duration-long $pds-motion-easing-base;

          &--active {
            opacity: 0;
          }
        }

        &--expand {
          transition: height $pds-motion-duration-short $pds-motion-easing-in;

          &--active {
            height: 200px;
            transition: height $pds-motion-duration-moderate $pds-motion-easing-base;
          }
        }
      }
    `,
  ],
  template: `
    <div class="wrapper">
      <h3 class="heading">Moving</h3>
      <div
        [ngClass]="['tile tile--moving', movingIsActive ? ' tile--moving--active' : '']"
        (click)="movingIsActive = !movingIsActive"
      >
        play
      </div>
      <h3 class="heading">Enter / Exit</h3>
      <div
        [ngClass]="['tile tile--enter-exit', enterExitIsActive ? ' tile--enter-exit--active' : '']"
        (click)="enterExitIsActive = !enterExitIsActive"
      >
        play
      </div>
      <h3 class="heading">Show / Hide</h3>
      <div
        [ngClass]="['tile tile--show-hide', showHideIsActive ? ' tile--show-hide--active' : '']"
        (click)="showHideIsActive = !showHideIsActive"
      >
        play
      </div>
      <h3 class="heading">Expand</h3>
      <div
        [ngClass]="['tile tile--expand', expandIsActive ? ' tile--expand--active' : '']"
        (click)="expandIsActive = !expandIsActive"
      >
        play
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesMotionExampleComponent {
  movingIsActive = false;
  enterExitIsActive = false;
  showHideIsActive = false;
  expandIsActive = false;
}
