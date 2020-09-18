import { Component, Element, h, Prop, Host } from '@stencil/core';

@Component({
  tag: 'p-tabs-item',
  styleUrl: 'tabs-item.scss',
  shadow: true
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  /** Defines the label used in tabs. */
  @Prop() public label: string;

  @Prop({ reflect: true }) public selected?: boolean;

  public render(): JSX.Element {
    return <Host><slot /></Host>;
  }
}
