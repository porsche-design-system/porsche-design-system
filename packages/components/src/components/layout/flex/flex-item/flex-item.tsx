import { JSX, Component, Prop, h, Element } from '@stencil/core';
import type {
  FlexItemAlignSelf,
  FlexItemAlignSelfType,
  FlexItemFlex,
  FlexItemFlexType,
  FlexItemGrow,
  FlexItemGrowType,
  FlexItemOffset,
  FlexItemShrink,
  FlexItemShrinkType,
  FlexItemWidth,
} from './flex-item-utils';
import { getComponentCss } from './flex-item-styles';
import { AllowedTypes, attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../utils';
import {
  FLEX_ITEM_ALIGN_SELFS,
  FLEX_ITEM_FLEXS,
  FLEX_ITEM_GROWS,
  FLEX_ITEM_OFFSETS,
  FLEX_ITEM_SHRINKS,
  FLEX_ITEM_WIDTHS,
} from './flex-item-utils';

const propTypes: PropTypes<typeof FlexItem> = {
  width: AllowedTypes.breakpoint<FlexItemWidth>(FLEX_ITEM_WIDTHS),
  offset: AllowedTypes.breakpoint<FlexItemOffset>(FLEX_ITEM_OFFSETS),
  alignSelf: AllowedTypes.breakpoint<FlexItemAlignSelfType>(FLEX_ITEM_ALIGN_SELFS),
  grow: AllowedTypes.breakpoint<FlexItemGrowType>(FLEX_ITEM_GROWS),
  shrink: AllowedTypes.breakpoint<FlexItemShrinkType>(FLEX_ITEM_SHRINKS),
  flex: AllowedTypes.breakpoint<FlexItemFlexType>(FLEX_ITEM_FLEXS),
};

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

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'pFlex');
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.width,
      this.offset,
      this.alignSelf,
      this.grow,
      this.shrink,
      this.flex
    );
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
