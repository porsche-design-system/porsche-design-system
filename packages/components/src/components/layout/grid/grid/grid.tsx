import { JSX, Component, Prop, h, Element, Watch } from '@stencil/core';
import type { GridDirection, GridGutter, GridWrap } from './grid-utils';
import { addComponentCss } from './grid-styles';
import { updateChildren } from '../../../../utils';

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

  /** Defines the gutter size for specific breakpoints. You always need to provide a base value when doing this. */
  @Prop() public gutter?: GridGutter = { base: 16, s: 24, m: 36 };

  @Watch('gutter')
  public handleGutterChange(): void {
    updateChildren(this.host);
  }

  public componentWillRender(): void {
    addComponentCss(this.host, this.direction, this.wrap, this.gutter);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
