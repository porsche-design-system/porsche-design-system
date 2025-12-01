import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  parseAndGetAriaAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './spinner-styles';
import { SPINNER_ARIA_ATTRIBUTES, SPINNER_SIZES, type SpinnerAriaAttribute, type SpinnerSize } from './spinner-utils';

const propTypes: PropTypes<typeof Spinner> = {
  size: AllowedTypes.breakpoint<SpinnerSize>(SPINNER_SIZES),
  aria: AllowedTypes.aria<SpinnerAriaAttribute>(SPINNER_ARIA_ATTRIBUTES),
};

@Component({
  tag: 'p-spinner',
  shadow: true,
})
export class Spinner {
  @Element() public host!: HTMLElement;

  /** Size of the spinner. */
  @Prop() public size?: BreakpointCustomizable<SpinnerSize> = 'small';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<SpinnerAriaAttribute>;

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size);

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
