import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
} from './flex-utils';
import {
  deprecatedFlexComponentMessage,
  FLEX_ALIGN_CONTENTS,
  FLEX_ALIGN_ITEMS,
  FLEX_DIRECTIONS,
  FLEX_JUSTIFY_CONTENTS,
  FLEX_WRAPS,
} from './flex-utils';
import { getComponentCss } from './flex-styles';
import {
  AllowedTypes,
  attachComponentCss,
  hasPropValueChanged,
  validateProps,
  warnIfDeprecatedComponentIsUsed,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes } from '../../../types';

const propTypes: PropTypes<typeof Flex> = {
  inline: AllowedTypes.breakpoint('boolean'),
  wrap: AllowedTypes.breakpoint<FlexWrap>(FLEX_WRAPS),
  direction: AllowedTypes.breakpoint<FlexDirection>(FLEX_DIRECTIONS),
  justifyContent: AllowedTypes.breakpoint<FlexJustifyContent>(FLEX_JUSTIFY_CONTENTS),
  alignItems: AllowedTypes.breakpoint<FlexAlignItems>(FLEX_ALIGN_ITEMS),
  alignContent: AllowedTypes.breakpoint<FlexAlignContent>(FLEX_ALIGN_CONTENTS),
};

/** @deprecated since v3.0.0, will be removed with next major release. Use native CSS Flex instead. */
@Component({
  tag: 'p-flex',
  shadow: true,
})
export class Flex {
  @Element() public host!: HTMLElement;

  /** Defines the flex containers content flow if 2 or more containers are siblings of each other. */
  @Prop() public inline?: BreakpointCustomizable<FlexInline> = false;

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: BreakpointCustomizable<FlexWrap> = 'nowrap';

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
  @Prop() public direction?: BreakpointCustomizable<FlexDirection> = 'row';

  /** Defines how the flex items are aligned along the main axis. */
  @Prop() public justifyContent?: BreakpointCustomizable<FlexJustifyContent> = 'flex-start';

  /** Defines how the flex items are aligned along the cross axis. */
  @Prop() public alignItems?: BreakpointCustomizable<FlexAlignItems> = 'stretch';

  /** This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis. */
  @Prop() public alignContent?: BreakpointCustomizable<FlexAlignContent> = 'stretch';

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedComponentIsUsed(this.host, deprecatedFlexComponentMessage);
    attachComponentCss(
      this.host,
      getComponentCss,
      this.inline,
      this.wrap,
      this.direction,
      this.justifyContent,
      this.alignItems,
      this.alignContent
    );

    return <slot />;
  }
}
