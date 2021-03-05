import { JSX, Component, Prop, h } from '@stencil/core';
import { isDark, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../types';

@Component({
  tag: 'p-spinner',
  styleUrl: 'spinner.scss',
  shadow: true,
})
export class Spinner {
  /** Size of the spinner. */
  @Prop() public size?: BreakpointCustomizable<'small' | 'medium' | 'large' | 'inherit'>;

  /** Adapts the spinner color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const spinnerClasses = {
      [prefix('spinner')]: true,
      [prefix('spinner--theme-dark')]: isDark(this.theme),
      ...mapBreakpointPropToPrefixedClasses('spinner--size', this.size),
    };
    const imageClasses = prefix('spinner__image');
    const bgClasses = prefix('spinner__bg');
    const fgClasses = prefix('spinner__fg');

    return (
      <span class={spinnerClasses} aria-busy="true" aria-live="polite">
        <svg class={imageClasses} viewBox="-16 -16 32 32" width="100%" height="100%" focusable="false">
          <circle class={bgClasses} r="9" />
          <circle class={fgClasses} r="9" />
        </svg>
      </span>
    );
  }
}
