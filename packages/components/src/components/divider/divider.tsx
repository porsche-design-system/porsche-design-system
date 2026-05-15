import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import { AllowedTypes, attachComponentCss, hasPropValueChanged, validateProps } from '../../utils';
import { getComponentCss } from './divider-styles';
import { DIVIDER_COLORS, DIVIDER_DIRECTIONS, type DividerColor, type DividerDirection } from './divider-utils';

const propTypes: PropTypes<typeof Divider> = {
  color: AllowedTypes.oneOf<DividerColor>(DIVIDER_COLORS),
  direction: AllowedTypes.breakpoint<DividerDirection>(DIVIDER_DIRECTIONS),
};

@Component({
  tag: 'p-divider',
  shadow: true,
})
export class Divider {
  @Element() public host!: HTMLElement;

  /** Sets the color of the divider line using PDS contrast tokens. */
  @Prop() public color?: DividerColor = 'contrast-lower';

  /** Sets the orientation of the divider to `horizontal` or `vertical`. Supports responsive breakpoint values. */
  @Prop() public direction?: BreakpointCustomizable<DividerDirection> = 'horizontal';

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.color, this.direction);

    return <hr />;
  }
}
