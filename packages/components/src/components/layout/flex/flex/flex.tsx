import { Component, Element, h, JSX, Prop } from '@stencil/core';
import type {
  FlexAlignContent,
  FlexAlignContentType,
  FlexAlignItems,
  FlexAlignItemsType,
  FlexDirection,
  FlexDirectionType,
  FlexInline,
  FlexJustifyContent,
  FlexJustifyContentType,
  FlexWrap,
  FlexWrapType,
} from './flex-utils';
import {
  FLEX_ALIGN_CONTENTS,
  FLEX_ALIGN_ITEMS,
  FLEX_DIRECTIONS,
  FLEX_JUSTIFY_CONTENTS,
  FLEX_WRAPS,
} from './flex-utils';
import { getComponentCss } from './flex-styles';
import { AllowedTypes, attachComponentCss, validateProps } from '../../../../utils';
import type { PropTypes } from '../../../../types';

const propTypes: PropTypes<typeof Flex> = {
  inline: AllowedTypes.breakpoint('boolean'),
  wrap: AllowedTypes.breakpoint<FlexWrapType>(FLEX_WRAPS),
  direction: AllowedTypes.breakpoint<FlexDirectionType>(FLEX_DIRECTIONS),
  justifyContent: AllowedTypes.breakpoint<FlexJustifyContentType>(FLEX_JUSTIFY_CONTENTS),
  alignItems: AllowedTypes.breakpoint<FlexAlignItemsType>(FLEX_ALIGN_ITEMS),
  alignContent: AllowedTypes.breakpoint<FlexAlignContentType>(FLEX_ALIGN_CONTENTS),
};

@Component({
  tag: 'p-flex',
  shadow: true,
})
export class Flex {
  @Element() public host!: HTMLElement;

  /** Defines the flex containers content flow if 2 or more containers are siblings of each other. */
  @Prop() public inline?: FlexInline = false;

  /** Handles wrapping behaviour of elements. */
  @Prop() public wrap?: FlexWrap = 'nowrap';

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
  @Prop() public direction?: FlexDirection = 'row';

  /** Defines how the flex items are aligned along the main axis. */
  @Prop() public justifyContent?: FlexJustifyContent = 'flex-start';

  /** Defines how the flex items are aligned along the cross axis. */
  @Prop() public alignItems?: FlexAlignItems = 'stretch';

  /** This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis. */
  @Prop() public alignContent?: FlexAlignContent = 'stretch';

  public componentWillRender(): void {
    validateProps(this, propTypes);
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
  }

  public render(): JSX.Element {
    return <slot />;
  }
}
