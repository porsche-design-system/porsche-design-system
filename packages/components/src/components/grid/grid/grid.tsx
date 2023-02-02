import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import { GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS, syncGridItemsProps } from './grid-utils';
import { getComponentCss } from './grid-styles';
import { AllowedTypes, attachComponentCss, validateProps, warnIfDeprecatedComponentIsUsed } from '../../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../../types';

const propTypes: PropTypes<typeof Grid> = {
  direction: AllowedTypes.breakpoint<GridDirection>(GRID_DIRECTIONS),
  wrap: AllowedTypes.breakpoint<GridWrap>(GRID_WRAPS),
  gutter: AllowedTypes.breakpoint<GridGutter>(GRID_GUTTERS),
};

@Component({
  tag: 'p-grid',
  shadow: true,
})
export class Grid {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: BreakpointCustomizable<GridDirection> = 'row';

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: BreakpointCustomizable<GridWrap> = 'wrap';

  /**
   * Has no effect anymore
   * @deprecated since v3.0.0, will be removed with next major release
   */
  @Prop() public gutter?: BreakpointCustomizable<GridGutter> = { base: 16, s: 24, m: 36 };

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(
      this.host,
      'Please use native CSS Grid (https://css-tricks.com/snippets/css/complete-guide-grid) instead in combination with the Porsche Grid utility based on CSS Grid.'
    );
    attachComponentCss(this.host, getComponentCss, this.direction, this.wrap);
    syncGridItemsProps(this.host, this.gutter);

    return <slot />;
  }
}
