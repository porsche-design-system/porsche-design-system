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
          transition: opacity $pds-motion-duration-moderate $pds-motion-easing-in,
            transform $pds-motion-duration-moderate $pds-motion-easing-in;

          &--active {
            opacity: 0;
            transform: translateY(40%);
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
        [ngClass]="{ 'tile tile--moving': true, 'tile--moving--active': isMovingActive }"
        (click)="isMovingActive = !isMovingActive"
      >
        play
      </div>
      <h3 class="heading">Enter / Exit</h3>
      <div
        [ngClass]="{ 'tile tile--enter-exit': true, ' tile--enter-exit--active': isEnterExitActive }"
        (click)="isEnterExitActive = !isEnterExitActive"
      >
        play
      </div>
      <h3 class="heading">Show / Hide</h3>
      <div
        [ngClass]="{ 'tile tile--show-hide': true, ' tile--show-hide--active': isShowHideActive }"
        (click)="isShowHideActive = !isShowHideActive"
      >
        play
      </div>
      <h3 class="heading">Expand</h3>
      <div
        [ngClass]="{ 'tile tile--expand': true, ' tile--expand--active': isExpandActive }"
        (click)="isExpandActive = !isExpandActive"
      >
        play
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesMotionExampleComponent {
  isMovingActive = false;
  isEnterExitActive = false;
  isShowHideActive = false;
  isExpandActive = false;
}
