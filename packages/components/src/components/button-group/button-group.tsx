import { Component, Element, h, Prop } from '@stencil/core';
import { AllowedTypes, attachComponentCss, validatePropChange, validateProps } from '../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { getComponentCss } from './button-group-styles';
import { GROUP_DIRECTIONS } from '../../styles/group-direction-styles';
import type { ButtonGroupDirection } from './button-group-utils';

const propTypes: PropTypes<typeof ButtonGroup> = {
  direction: AllowedTypes.breakpoint<ButtonGroupDirection>(GROUP_DIRECTIONS),
};

@Component({
  tag: 'p-button-group',
  shadow: true,
})
export class ButtonGroup {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default is ’{base: ‘column’, xs: ‘row’}' showing buttons vertically stacked on mobile viewports and side-by-side in a horizontal row from breakpoint ‘xs’. You always need to provide a base value when using breakpoints. */
  @Prop() public direction?: BreakpointCustomizable<ButtonGroupDirection> = { base: 'column', xs: 'row' };

  public componentShouldUpdate(
    newVal: unknown,
    oldVal: unknown,
    propName: keyof InstanceType<typeof ButtonGroup>
  ): boolean {
    return validatePropChange(newVal, oldVal, propName, ['direction']);
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
