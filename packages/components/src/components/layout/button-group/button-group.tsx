import { Component, Element, h, Prop } from '@stencil/core';

import { mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import type { ButtonGroupDirection } from './button-group-utils';

@Component({
  tag: 'p-button-group',
  styleUrl: 'button-group.scss',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is "{base: 'column', xs: 'row'}" in a standard layout the buttons are placed in a stacked order on mobile up to viewports smaller than "xs" and side by side on viewports larger than "xs". You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: ButtonGroupDirection = {
    base: 'column',
    xs: 'row',
  };

  public render(): JSX.Element {
    const buttonGroupClasses = {
      [prefix('button-group')]: true,
      ...mapBreakpointPropToPrefixedClasses('button-group--direction', this.direction),
    };

    return (
      <div class={buttonGroupClasses}>
        <slot />
      </div>
    );
  }
}
