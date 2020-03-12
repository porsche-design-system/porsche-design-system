import { Component, h, JSX, Prop, } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { Theme } from '../../../types';

@Component({
  tag: 'p-divider',
  styleUrl: 'divider.scss',
  shadow: true
})
export class Divider {
  /** Basic divider color variations depending on theme property. */
  @Prop() public color?: 'neutral-contrast-high' | 'neutral-contrast-medium' | 'neutral-contrast-low';

  @Prop() public orientation?: 'vertical';

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public render(): JSX.Element {
    const dividerClasses = cx(
      prefix('divider'),
      prefix(`divider--color-${this.color}`),
      prefix(`divider--theme-${this.theme}`),
      prefix(`divider--orientation-${this.orientation}`)
    );

    return (
      <hr class={dividerClasses}/>
    );
  }

}
