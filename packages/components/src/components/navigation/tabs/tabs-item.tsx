import { Component, Element, h, Prop } from '@stencil/core';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-tabs-item',
  styleUrl: 'tabs-item.scss',
  shadow: true
})
export class TabsItem {
  @Element() public host!: HTMLElement;

  @Prop() label: string;

  @Prop({ reflect: true }) disabled: boolean;

  @Prop() href?: string;

  @Prop() selected?: boolean;

  public render(): JSX.Element {
    const tabContentClasses = {
      [prefix('tabs-item')]: true,
      [prefix('tabs-item__disabled')]: this.disabled,
      [prefix('tabs-item__selected')]: this.selected
    };

    return <span class={tabContentClasses}>{this.selected && <slot />}</span>;
  }
}
