import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { deprecatedGridComponentMessage, GRID_DIRECTIONS, GRID_GUTTERS, GRID_WRAPS } from './grid-utils';
import { getComponentCss } from './grid-styles';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../../utils';

const propTypes: PropTypes<typeof Grid> = {
  direction: AllowedTypes.breakpoint<GridDirection>(GRID_DIRECTIONS),
  wrap: AllowedTypes.breakpoint<GridWrap>(GRID_WRAPS),
  gutter: AllowedTypes.breakpoint<GridGutter>(GRID_GUTTERS),
};

/** @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead. */
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

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, deprecatedGridComponentMessage);
    attachComponentCss(this.host, getComponentCss, this.direction, this.wrap);

    return <slot />;
  }
}
