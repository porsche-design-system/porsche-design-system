import { JSX, Component, Prop, h, Element } from '@stencil/core';
import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import { getComponentCss } from './grid-item-styles';
import { attachComponentCss, throwIfParentIsNotOfKind } from '../../../../utils';

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
    const grid = this.host.parentElement as HTMLPGridElement;
    if (grid) {
      attachComponentCss(this.host, getComponentCss, this.size, this.offset, grid.gutter);
    }
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
