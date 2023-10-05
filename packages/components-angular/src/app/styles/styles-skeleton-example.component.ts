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

        &--light {
          background: $pds-theme-light-background-base;
          color: $pds-theme-light-primary;
        }

        &--dark {
          background: $pds-theme-dark-background-base;
          color: $pds-theme-dark-primary;
        }
      }

      // Typography
      .heading {
        @include pds-heading-medium;
        text-align: center;
        width: 100%;
        margin: 0;
      }

      // Skeletons
      .skeleton-box {
        height: 200px;
        width: 500px;

        &--light {
          @include pds-skeleton('light');
        }
        &--dark {
          @include pds-skeleton('dark');
        }
      }

      .skeleton-text {
        height: $pds-font-line-height;
        width: 100px;

        &--light {
          @include pds-skeleton('light');
        }
        &--dark {
          @include pds-skeleton('dark');
        }

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
    <div class="wrapper wrapper--light">
      <h3 class="heading">Skeleton Light</h3>
      <div class="skeleton-box skeleton-box--light"></div>
    </div>
    <div class="wrapper wrapper--light">
      <div class="skeleton-text skeleton-text--light skeleton-text--small"></div>
      <div class="skeleton-text skeleton-text--light skeleton-text--medium"></div>
      <div class="skeleton-text skeleton-text--light skeleton-text--large"></div>
    </div>

    <div class="wrapper wrapper--dark">
      <h3 class="heading">Skeleton Dark</h3>
      <div class="skeleton-box skeleton-box--dark"></div>
    </div>
    <div class="wrapper wrapper--dark">
      <div class="skeleton-text skeleton-text--dark skeleton-text--small"></div>
      <div class="skeleton-text skeleton-text--dark skeleton-text--medium"></div>
      <div class="skeleton-text skeleton-text--dark skeleton-text--large"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesSkeletonExampleComponent {}
