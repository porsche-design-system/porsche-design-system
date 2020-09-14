import { Component, Element, h, Prop, Host } from '@stencil/core';
import { LinkTarget } from '../../../types';

@Component({
  tag: 'p-tabs-item',
  styleUrl: 'tabs-item.scss',
  shadow: true
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  /** Defines the label used in tabs. */
  @Prop() public label: string;

  /** When providing an url then the component will be rendered as `<a>`. */
  @Prop() public href?: string;

  /** Target attribute where the link should be opened. */
  @Prop() public target?: LinkTarget = '_self';

  @Prop({ reflect: true }) public selected?: boolean;

  public render(): JSX.Element {
    return <Host>{this.selected && <slot />}</Host>;
  }
}
