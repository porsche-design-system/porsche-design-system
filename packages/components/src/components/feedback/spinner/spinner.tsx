import { JSX, Component, Prop, h } from '@stencil/core';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';

@Component({
  tag: 'p-spinner',
  styleUrl: 'spinner.scss',
  shadow: true
})
export class Spinner {
  /** Size of the spinner. */
  @Prop() public size?: BreakpointCustomizable<'small' | 'medium' | 'large' | 'inherit'> = 'small';

  /** Adapts the spinner color depending on the theme. */
  @Prop() public theme?: 'light' | 'dark' = 'light';

  public render(): JSX.Element {
    const spinnerClasses = {
      [prefix('spinner')]: true,
      [prefix(`spinner--theme-${this.theme}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('spinner--size', this.size)
    };
    const imageClasses = prefix('spinner__image');
    const bgClasses = prefix('spinner__bg');
    const fgClasses = prefix('spinner__fg');

    return (
      <span class={spinnerClasses} aria-busy="true" aria-live="polite">
        <svg class={imageClasses} viewBox="0 0 32 32" width="100%" height="100%" role="img" focusable="false">
          <circle class={bgClasses} cx="50%" cy="50%" r="9" />
          <circle class={fgClasses} cx="50%" cy="50%" r="9" />
        </svg>
      </span>
    );
  }
}
