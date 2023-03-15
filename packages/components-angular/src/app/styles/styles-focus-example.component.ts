import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-styles-focus-example',
  styles: [
    `
      @import '@porsche-design-system/components-js/styles/scss';

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

      // Native Button
      .native-button {
        @include pds-text-small;
        @include pds-focus;
      }

      // Native Anchor
      .native-anchor {
        @include pds-text-small;
        @include pds-focus;

        &--light {
          color: $pds-theme-light-primary;
        }

        &--dark {
          color: $pds-theme-dark-primary;
        }
      }
    `,
  ],
  template: `
    <div>
      <div class="wrapper wrapper--light">
        <h3 class="heading">Focus Light (only visible by keyboard navigation)</h3>
        <button class="native-button">Some Button</button>
        <a href="#" class="native-anchor native-anchor--light">Some Anchor</a>
        <p style="max-width: 15rem">
          Lorem Ipsum <a href="#" class="native-anchor native-anchor--light">is simply dummy text of the printing</a>and
          typesetting industry.
        </p>
      </div>
      <div class="wrapper wrapper--dark">
        <h3 class="heading">Focus Dark (only visible by keyboard navigation)</h3>
        <button class="native-button">Some Button</button>
        <a href="#" class="native-anchor native-anchor--dark">Some Anchor</a>
        <p style="max-width: 15rem">
          Lorem Ipsum <a href="#" class="native-anchor native-anchor--dark">is simply dummy text of the printing</a>and
          typesetting industry.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylesFocusExampleComponent {}
