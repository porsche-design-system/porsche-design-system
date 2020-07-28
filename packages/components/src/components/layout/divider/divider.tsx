import { Component, h, JSX, Prop } from '@stencil/core';
import cx from 'classnames';
import { mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { Theme } from '../../../types';

@Component({
  tag: 'p-divider',
  styleUrl: 'divider.scss',
  shadow: true
})
export class Divider {
  /** Defines color depending on theme. */
  @Prop() public color?: 'neutral-contrast-high' | 'neutral-contrast-medium' | 'neutral-contrast-low' = 'neutral-contrast-low';

  /** Defines orientation. */
  @Prop() public orientation?: 'vertical' | 'horizontal' = 'horizontal';

  /** Adapts color depending on theme. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const dividerClasses = cx(
      prefix('divider'),
      prefix(`divider--color-${this.color}`),
      prefix(`divider--theme-${this.theme}`),
      mapBreakpointPropToPrefixedClasses('divider--orientation', this.orientation)
    );

    return (
      <hr class={dividerClasses}/>
    );
  }
}
