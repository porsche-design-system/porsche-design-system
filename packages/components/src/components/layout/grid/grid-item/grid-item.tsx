import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type { GridItemOffset, GridItemOffsetType, GridItemSize, GridItemSizeType } from './grid-item-utils';
import { GRID_ITEM_OFFSETS, GRID_ITEM_SIZES } from './grid-item-utils';
import { getComponentCss } from './grid-item-styles';
import type { PropTypes } from '../../../../utils';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';

const propTypes: PropTypes<typeof GridItem> = {
  size: AllowedTypes.breakpoint<GridItemSizeType>(GRID_ITEM_SIZES),
  offset: AllowedTypes.breakpoint<GridItemOffsetType>(GRID_ITEM_OFFSETS),
};

@Component({
  tag: 'p-grid-item',
  shadow: true,
})
export class GridItem {
  @Element() public host!: HTMLElement;

  /** The size of the column. Can be between 1 and 12. Also defines the size of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
  @Prop() public size?: GridItemSize = 1;

  /** The offset of the column. Can be between 0 and 11. Also defines the offset of the column for specific breakpoints, like {base: 6, l: 3}. You always need to provide a base value when doing this. */
  @Prop() public offset?: GridItemOffset = 0;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pGrid');
  }

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-grid-item');

    const grid = this.host.parentElement as HTMLPGridElement;
    if (grid) {
      attachComponentCss(this.host, getComponentCss, this.size, this.offset, grid.gutter);
    }
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
