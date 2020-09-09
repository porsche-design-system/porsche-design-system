import { Component, Element, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'p-tabs-item',
  shadow: true
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  @Prop() public label: string;

  @Prop({ reflect: true }) public disabled: boolean;

  @Prop() public href?: string;

  @Prop() public target?: string;

  @Prop({ reflect: true }) public selected?: boolean;

  public render(): JSX.Element {
    return <Host>{this.selected && <slot />}</Host>;
  }
}
