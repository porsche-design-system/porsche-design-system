import { Component, Element, h, Prop } from '@stencil/core';

import { getPrefixedTagNames, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import type { ButtonGroupDirection } from './button-group-utils';

@Component({
  tag: 'p-button-group',
  styleUrl: 'button-group.scss',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is "{base: 'column', s: 'row'}" in a standard layout the buttons are placed in a stacked order on mobile up to viewports smaller than "s" and side by side on viewports larger than "s". You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: ButtonGroupDirection = {
    base: 'column',
    s: 'row',
  };

  public render(): JSX.Element {
    const buttonGroupClasses = {
      [prefix('button-group')]: true,
      ...mapBreakpointPropToPrefixedClasses('button-group--direction', this.direction),
    };
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pFlex class={buttonGroupClasses} direction={this.direction}>
        <slot />
      </PrefixedTagNames.pFlex>
    );
  }
}
