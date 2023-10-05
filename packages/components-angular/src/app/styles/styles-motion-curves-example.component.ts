import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-motion-curves-example',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      // Wrapper
      .wrapper {
        display: flex;
        gap: $pds-grid-gap;
        flex-direction: column;
        padding: $pds-spacing-fluid-medium;
      }
      .motion-example-wrapper {
        display: flex;
        gap: $pds-grid-gap;
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

        &--small {
          @include pds-heading-small;
        }
      }
      .description {
        @include pds-text-x-small;
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
        transform: translateX(-200px);
      }

      // Motion
      .moving-standard {
        transition-duration: $pds-motion-duration-very-long;
        transition-timing-function: $pds-motion-easing-base;
      }

      .moving-in {
        transition-duration: $pds-motion-duration-long;
        transition-timing-function: $pds-motion-easing-in;
      }

      .moving-out {
        transition-duration: $pds-motion-duration-moderate;
        transition-timing-function: $pds-motion-easing-out;
      }

      .active {
        transform: translateX(200px);
      }
    `,
  ],
  template: `
    <div>
      <div class="wrapper">
        <h3 class="heading">Motion Curves</h3>
        <div class="motion-example-wrapper">
          <h4 class="heading heading--small">Acceleration: 25%, Deceleration: 25%</h4>
          <p class="description">
            This curve results in a smooth and gradual acceleration at the beginning, reaches its maximum speed in the
            middle, and then gently decelerates towards the end. It's a commonly used easing curve that provides a
            natural and visually pleasing animation transition.
          </p>
          <div class="moving-standard tile" (click)="onClick($event)"></div>
        </div>
        <div class="motion-example-wrapper">
          <h4 class="heading heading--small">Acceleration: 0%, Deceleration: 80%</h4>
          <p class="description">
            Objects rush onto the screen with maximum speed, then gradually ease into a gentle slowdown until they come
            to a stop.
          </p>
          <div class="moving-in tile" (click)="onClick($event)"></div>
        </div>
        <div class="motion-example-wrapper">
          <h4 class="heading heading--small">Acceleration: 40%, Deceleration:50%</h4>
          <p class="description">
            This type of easing provides a relatively quick start followed by a more gradual deceleration.
          </p>
          <div class="moving-out tile" (click)="onClick($event)"></div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesMotionCurvesExampleComponent {
  onClick = (e: MouseEvent): void => {
    (e.target as HTMLDivElement).classList.toggle('active');
  };
}
