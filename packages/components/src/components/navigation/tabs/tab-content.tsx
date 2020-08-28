import { Component, Element, h, Listen, Prop } from '@stencil/core';
import { prefix } from '../../../utils';
import { ChangeTabEvent } from './tab';

@Component({
  tag: 'p-tab-content',
  styleUrl: 'tab-content.scss',
  shadow: true
})
export class TabContent {
  @Element() public host!: HTMLElement;

  @Prop() label: string;

  @Prop({ reflect: true }) disabled: boolean;

  @Prop() index?: number;

  @Prop() href?: string;

  @Prop() selected?: boolean;

  @Listen('initTabs', { target: 'parent', capture: true })
  setActiveTabHandler(event: CustomEvent) {
    event.detail.activeTab === this.index ? (this.selected = true) : (this.selected = false);
  }

  @Listen('changeTab', { target: 'parent', capture: true })
  changeTabHandler(event: CustomEvent<ChangeTabEvent>) {
    event.detail.tabIndex === this.index ? (this.selected = true) : (this.selected = false);
  }

  public render(): JSX.Element {
    const tabContentClasses = {
      [prefix('tab-content')]: true,
      [prefix('tab-content__disabled')]: this.disabled,
      [prefix('tab-content__selected')]: this.selected
    };

    return <span class={tabContentClasses}>{this.selected && <slot />}</span>;
  }
}
