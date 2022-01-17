import { JSX, Component, Prop, h, Watch, Element } from '@stencil/core';
import type { SelectedAriaAttributes, ThemeExtendedElectricDark } from '../../../types';
import type { SpinnerSize, SpinnerAriaAttributes } from './spinner-utils';
import { verifySpinnerSize, SPINNER_ARIA_ATTRIBUTES } from './spinner-utils';
import { attachComponentCss, parseAndGetAriaAttributes } from '../../../utils';
import { getComponentCss } from './spinner-styles';

@Component({
  tag: 'p-spinner',
  shadow: true,
})
export class Spinner {
  @Element() public host!: HTMLElement;

  /** Size of the spinner. */
  @Prop() public size?: SpinnerSize = 'small';

  /** Adapts the spinner color depending on the theme. */
  @Prop() public theme?: ThemeExtendedElectricDark = 'light';

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<SpinnerAriaAttributes>;

  @Watch('size')
  public watchSizeHandler(newValue: SpinnerSize): void {
    verifySpinnerSize(newValue);
  }

  public componentWillLoad(): void {
    verifySpinnerSize(this.size);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.size, this.theme);
  }

  public render(): JSX.Element {
    return (
      <span
        class="root"
        role="alert"
        aria-live="assertive"
        {...parseAndGetAriaAttributes(this.aria, SPINNER_ARIA_ATTRIBUTES)}
      >
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
