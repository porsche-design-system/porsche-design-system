import { Component, Element, type JSX, Prop, h } from '@stencil/core';
import { GROUP_DIRECTIONS } from '../../styles/group-direction-styles';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './button-group-styles';
import type { ButtonGroupDirection } from './button-group-utils';

const propTypes: PropTypes<typeof ButtonGroup> = {
  direction: AllowedTypes.breakpoint<ButtonGroupDirection>(GROUP_DIRECTIONS),
};

/**
 * @slot {"name": "", "description": "Default slot for the buttons to group." }
 */
@Component({
  tag: 'p-button-group',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: BreakpointCustomizable<ButtonGroupDirection> = { base: 'column', xs: 'row' };

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.direction);

    return (
      <div role="group">
        <slot />
      </div>
    );
  }
}
