import { Component, Element, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'p-tabs-item',
  shadow: true
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  @Prop() label: string;

  @Prop({ reflect: true }) disabled: boolean;

  @Prop() href?: string;

  @Prop() target?: string;

  @Prop({ reflect: true }) selected?: boolean;

  public render(): JSX.Element {
    return <Host>{this.selected && <slot />}</Host>;
  }
}
