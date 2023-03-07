import { Component, Element, h, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, validateProps } from '../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { getComponentCss } from './button-group-styles';
import type { JssDirections } from '../../styles/jss-direction-styles';
import { JSS_DIRECTIONS } from '../../styles/jss-direction-styles';

const propTypes: PropTypes<typeof ButtonGroup> = {
  direction: AllowedTypes.breakpoint<JssDirections>(JSS_DIRECTIONS),
};

@Component({
  tag: 'p-button-group',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: BreakpointCustomizable<JssDirections> = { base: 'column', xs: 'row' };

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
