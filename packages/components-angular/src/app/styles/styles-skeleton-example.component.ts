import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-skeleton-example',
  styles: [
    `
      @use '@porsche-design-system/components-angular/styles' as *;

      // Wrapper
      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        gap: $pds-grid-gap;
        padding: $pds-spacing-fluid-medium;
      }

      // Typography
      .heading {
        @include pds-heading-medium;
        text-align: center;
        width: 100%;
        margin: 0;
      }

      // Skeletons
      .skeleton-square {
        height: 100px;
        width: 100px;

        &--small {
          @include pds-skeleton('small');
        }
        &--medium {
          @include pds-skeleton('medium');
        }
      }

      .skeleton-text {
        @include pds-skeleton('small');
        height: $pds-font-line-height;
        width: 100px;

        &--small {
          font-size: $pds-font-size-text-small;
        }
        &--medium {
          font-size: $pds-font-size-text-medium;
        }
        &--large {
          font-size: $pds-font-size-text-large;
        }
      }
    `,
  ],
  template: `
    <div class="wrapper">
      <h3 class="heading">Skeletons Square</h3>
      <div class="skeleton-square skeleton-square--small"></div>
      <div class="skeleton-square skeleton-square--medium"></div>
    </div>

    <div class="wrapper">
      <h3 class="heading">Skeletons Heading/Text</h3>
      <div class="skeleton-text skeleton-text--small"></div>
      <div class="skeleton-text skeleton-text--medium"></div>
      <div class="skeleton-text skeleton-text--large"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesSkeletonExampleComponent {}
