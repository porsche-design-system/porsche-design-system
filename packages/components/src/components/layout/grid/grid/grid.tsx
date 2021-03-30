import { JSX, Component, Prop, h, Element } from '@stencil/core';
import type { GridDirection, GridWrap } from './grid-utils';
import { addCss } from './grid-utils';

@Component({
  tag: 'p-grid',
  shadow: true,
})
export class Grid {
  @Element() public host!: HTMLElement;

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. Also defines the direction for specific breakpoints, like {base: "column", l: "row"}. You always need to provide a base value when doing this. */
  @Prop() public direction?: GridDirection = 'row';

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: GridWrap = 'wrap';

  public componentWillRender(): void {
    addCss(this.host, this.direction, this.wrap);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
