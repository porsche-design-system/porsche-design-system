import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import { GRID_ITEM_OFFSETS, GRID_ITEM_SIZES } from './grid-item-utils';
import { getComponentCss } from './grid-item-styles';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  throwIfParentIsNotOfKind,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../../utils';
import { deprecatedGridComponentMessage } from '../grid/grid-utils';

const propTypes: PropTypes<typeof GridItem> = {
  size: AllowedTypes.breakpoint<GridItemSize>(GRID_ITEM_SIZES),
  offset: AllowedTypes.breakpoint<GridItemOffset>(GRID_ITEM_OFFSETS),
};

/** @deprecated since v3.0.0, will be removed with next major release. Use native CSS Grid instead. */
@Component({
  tag: 'p-grid-item',
  shadow: true,
})
export class GridItem {
  @Element() public host!: HTMLElement;

  /** The size of the column. Can be between 1 and 12. Also defines the size of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<GridItemSize> = 1;

  /** The offset of the column. Can be between 0 and 11. Also defines the offset of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
  @Prop() public offset?: BreakpointCustomizable<GridItemOffset> = 0;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-grid');
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, deprecatedGridComponentMessage);
    attachComponentCss(this.host, getComponentCss, this.size, this.offset);

    return <slot />;
  }
}
