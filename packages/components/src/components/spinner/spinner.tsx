import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { PropTypes, SelectedAriaAttributes, Theme } from '../../types';
import type { SpinnerAriaAttributes, SpinnerSize, SpinnerSizeType } from './spinner-utils';
import { SPINNER_ARIA_ATTRIBUTES, SPINNER_SIZES, verifySpinnerSize } from './spinner-utils';
import { AllowedTypes, attachComponentCss, parseAndGetAriaAttributes, THEMES, validateProps } from '../../utils';
import { getComponentCss } from './spinner-styles';

const propTypes: PropTypes<typeof Spinner> = {
  size: AllowedTypes.breakpoint<SpinnerSizeType>(SPINNER_SIZES),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  aria: AllowedTypes.aria<SpinnerAriaAttributes>(SPINNER_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-spinner',
  shadow: true,
})
export class Spinner {
  @Element() public host!: HTMLElement;

  /** Size of the spinner. */
  @Prop() public size?: SpinnerSize = 'small';

  /** Adapts the spinner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<SpinnerAriaAttributes>;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    verifySpinnerSize(this.size); // TODO: redundant?
    attachComponentCss(this.host, getComponentCss, this.size, this.theme);

    return (
      <span class="root" role="alert" aria-live="assertive" {...parseAndGetAriaAttributes(this.aria)}>
        {/* empty element needed to announce aria-label in screen readers */}
        <span class="sr-only">&nbsp;</span>
        <svg viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false" aria-hidden="true">
          <circle r="9" />
          <circle r="9" />
        </svg>
      </span>
    );
  }
}
