import { Component, Element, h, Prop } from '@stencil/core';
import { mapBreakpointPropToPrefixedClasses } from '../../../utils';
import type { ButtonGroupDirection } from './button-group-utils';

@Component({
  tag: 'p-button-group',
  styleUrl: 'button-group.scss',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: ButtonGroupDirection = {
    base: 'column',
    xs: 'row',
  };

  public render(): JSX.Element {
    const buttonGroupClasses = {
      ['group']: true,
      ...mapBreakpointPropToPrefixedClasses('group--direction', this.direction, undefined, true),
    };

    return (
      <div class={buttonGroupClasses} role="group">
        <slot />
      </div>
    );
  }
}
