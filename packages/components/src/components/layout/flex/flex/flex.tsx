import { JSX, Component, Prop, h, Element } from '@stencil/core';
import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
} from './flex-utils';
import { getComponentCss } from './flex-styles';
import { attachComponentCss } from '../../../../utils';

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
