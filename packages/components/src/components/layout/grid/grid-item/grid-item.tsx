import { JSX, Component, Host, Prop, h, Element } from '@stencil/core';
import type { GridItemOffset, GridItemSize } from './grid-item-utils';
import { addCss } from './grid-item-utils';

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

  public componentWillLoad(): void {
    addCss(this.host, this.size, this.offset);
  }

  public componentWillUpdate(): void {
    addCss(this.host, this.size, this.offset);
  }

  public render(): JSX.Element {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
