import { type JSX, Component, Prop, h, Element } from '@stencil/core';
import type {
  FlexItemAlignSelf,
  FlexItemFlex,
  FlexItemGrow,
  FlexItemOffset,
  FlexItemShrink,
  FlexItemWidth,
} from './flex-item-utils';
import { getComponentCss } from './flex-item-styles';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  throwIfParentIsNotOfKind,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import {
  FLEX_ITEM_ALIGN_SELFS,
  FLEX_ITEM_FLEXS,
  FLEX_ITEM_GROWS,
  FLEX_ITEM_OFFSETS,
  FLEX_ITEM_SHRINKS,
  FLEX_ITEM_WIDTHS,
} from './flex-item-utils';
import { deprecatedFlexComponentMessage } from '../flex/flex-utils';

const propTypes: PropTypes<typeof FlexItem> = {
  width: AllowedTypes.breakpoint<FlexItemWidth>(FLEX_ITEM_WIDTHS),
  offset: AllowedTypes.breakpoint<FlexItemOffset>(FLEX_ITEM_OFFSETS),
  alignSelf: AllowedTypes.breakpoint<FlexItemAlignSelf>(FLEX_ITEM_ALIGN_SELFS),
  grow: AllowedTypes.breakpoint<FlexItemGrow>(FLEX_ITEM_GROWS),
  shrink: AllowedTypes.breakpoint<FlexItemShrink>(FLEX_ITEM_SHRINKS),
  flex: AllowedTypes.breakpoint<FlexItemFlex>(FLEX_ITEM_FLEXS),
};

/** @deprecated since v3.0.0, will be removed with next major release. Use native CSS Flex instead. */
@Component({
  tag: 'p-flex-item',
  shadow: true,
})
export class FlexItem {
  @Element() public host!: HTMLElement;

  /** The width of the flex item. You can also supply values for specific breakpoints, like {base: "full", l: "one-quarter"}. You always need to provide a base value when doing this. */
  @Prop() public width?: BreakpointCustomizable<FlexItemWidth> = 'auto';

  /** The offset of the column. You can also supply values for specific breakpoints, like {base: "none", l: "one-quarter"}. You always need to provide a base value when doing this. */
  @Prop() public offset?: BreakpointCustomizable<FlexItemOffset> = 'none';

  /** Defines how this flex item is aligned along the cross axis. This overwrites the cross axis alignment set by the container. Corresponds to the "alignSelf" css property. */
  @Prop() public alignSelf?: BreakpointCustomizable<FlexItemAlignSelf> = 'auto';

  /** The ability to allow/disallow the flex child to grow. */
  @Prop() public grow?: BreakpointCustomizable<FlexItemGrow> = 0;

  /** The ability to allow/disallow the flex child to shrink. */
  @Prop() public shrink?: BreakpointCustomizable<FlexItemShrink> = 1;

  /** The shorthand property for the combined definition of "shrink", "grow" and "basis" */
  @Prop() public flex?: BreakpointCustomizable<FlexItemFlex> = 'initial';

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-flex');
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, deprecatedFlexComponentMessage);
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

    return <slot />;
  }
}
