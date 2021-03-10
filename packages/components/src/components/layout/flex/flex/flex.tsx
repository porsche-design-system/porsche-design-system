import { JSX, Component, Prop, h, Element } from '@stencil/core';
import type {
  FlexAlignContent,
  FlexAlignItems,
  FlexDirection,
  FlexInline,
  FlexJustifyContent,
  FlexWrap,
} from './flex-utils';
import { addCss } from './flex-utils';

@Component({
  tag: 'p-flex',
  shadow: true,
})
export class Flex {
  @Element() public host!: HTMLElement;

  /** Defines the flex containers content flow if 2 or more containers are siblings of each other. */
  @Prop() public inline?: FlexInline = false;

  /** If set, overflowing elements will wrap to a new line. */
  @Prop() public wrap?: FlexWrap = 'nowrap';

  /** Defines the direction of the main and cross axis. The default "row" defines the main axis as horizontal left to right. */
  @Prop() public direction?: FlexDirection = 'row';

  /** Defines how the flex items are aligned along the main axis. */
  @Prop() public justifyContent?: FlexJustifyContent = 'flex-start';

  /** Defines how the flex items are aligned along the cross axis. */
  @Prop() public alignItems?: FlexAlignItems = 'stretch';

  /** This aligns a flex container's individual lines when there is extra space in the cross-axis, similar to how "justifyContent" aligns individual items along the main axis. */
  @Prop() public alignContent?: FlexAlignContent = 'stretch';

  public componentWillLoad(): void {
    this.addCss();
  }

  public componentWillUpdate(): void {
    this.addCss();
  }

  public render(): JSX.Element {
    return <slot />;
  }

  private addCss(): void {
    addCss(this.host, this.inline, this.wrap, this.direction, this.justifyContent, this.alignItems, this.alignContent);
  }
}
