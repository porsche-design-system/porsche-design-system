import { JSX, Component, Prop, h, Watch } from '@stencil/core';
import type { Theme, SelectedAriaAttributes } from '../../../types';
import type { SpinnerSize, SpinnerAriaAttributes } from './spinner-utils';
import { verifySpinnerSize, SPINNER_ARIA_ATTRIBUTES } from './spinner-utils';
import { isDark, mapBreakpointPropToClasses, parseAndGetAccessibilityAttributes } from '../../../utils';

@Component({
  tag: 'p-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class Spinner {
  /** Size of the spinner. */
  @Prop() public size?: SpinnerSize = 'small';

  /** Adapts the spinner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public accessibility?: SelectedAriaAttributes<SpinnerAriaAttributes>;

  @Watch('size')
  public watchSizeHandler(newValue: SpinnerSize): void {
    verifySpinnerSize(newValue);
  }

  public componentWillLoad(): void {
    verifySpinnerSize(this.size);
  }

  public render(): JSX.Element {
    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ...mapBreakpointPropToClasses('root--size', this.size),
    };

    return (
      <span
        class={rootClasses}
        role="alert"
        aria-busy="true"
        aria-live="assertive"
        {...parseAndGetAccessibilityAttributes(this.accessibility, SPINNER_ARIA_ATTRIBUTES)}
      >
        <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
          <circle r="9" />
          <circle r="9" />
        </svg>
      </span>
    );
  }
}
