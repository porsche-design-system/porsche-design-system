import { JSX, Component, Prop, h, Element } from '@stencil/core';
import {
  addCss,
  FlexItemAlignSelf,
  FlexItemFlex,
  FlexItemGrow,
  FlexItemOffset,
  FlexItemShrink,
  FlexItemWidth,
} from './flex-item-utils';

@Component({
  tag: 'p-flex-item',
  shadow: true,
})
export class FlexItem {
  @Element() public host!: HTMLElement;

  /** The width of the flex item. You can also supply values for specific breakpoints, like {base: "full", l: "one-quarter"}. You always need to provide a base value when doing this. */
  @Prop() public width?: FlexItemWidth = 'auto';

  /** The offset of the column. You can also supply values for specific breakpoints, like {base: "none", l: "one-quarter"}. You always need to provide a base value when doing this. */
  @Prop() public offset?: FlexItemOffset = 'none';

  /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
  @Prop() public alignSelf?: FlexItemAlignSelf = 'auto';

  /** The ability to allow/disallow the flex child to grow. */
  @Prop() public grow?: FlexItemGrow = 0;

  /** The ability to allow/disallow the flex child to shrink. */
  @Prop() public shrink?: FlexItemShrink = 1;

  /** The shorthand property for the combined definition of "shrink", "grow" and "basis" */
  @Prop() public flex?: FlexItemFlex = 'initial';

  public componentWillRender(): void {
    addCss(this.host, this.width, this.offset, this.alignSelf, this.grow, this.shrink, this.flex);
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
