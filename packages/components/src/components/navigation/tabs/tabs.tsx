import { Component, h, Element, Prop, Host, State } from '@stencil/core';
import { prefix } from '../../../utils';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  @Prop() public weight?: 'regular' | 'semiBold' = 'regular';

  @Prop() public disabled?: boolean = false;

  @Prop() public activeTab?: number = 0;

  @State() tabSelected: number = 0;

  componentWillLoad() {
    this.handleOnClick(this.activeTab);
  }

  public tabType: 'button' | 'aTag' = 'button';

  public render(): JSX.Element {
    const tabHeaderClasses = {
      [prefix(`tabs__header--align-${this.align}`)]: true,
      [prefix(`tabs__header`)]: true
    };

    const tabContentClasses = {
      [prefix('tabs__content')]: true
    };

    return (
      <Host>
        <span class={tabHeaderClasses}>{this.renderButtons()}</span>
        <div class={tabContentClasses}>
          <slot />
        </div>
      </Host>
    );
  }

  private renderButtons = () => {
    return this.getTabContentElements().map((tab, index) => {
      const tabButtonClasses = {
        [prefix(`tabs__button`)]: true,
        [prefix(`tabs__button--${this.weight}`)]: true,
        [prefix(`tabs__button--selected`)]: tab.selected,
        [prefix(`tabs__button--disabled`)]: tab.disabled
      };
      return (
        // use p-button-pure?
        <button role="tab" disabled={tab.disabled} class={tabButtonClasses} onClick={() => this.handleOnClick(index)}>
          {tab.label}
        </button>
      );
    });
  };

  private handleOnClick = (index: number): void => {
    const allTabItems = this.getTabContentElements();
    allTabItems[this.tabSelected].selected = false;
    this.tabSelected = index;
    allTabItems[this.tabSelected].selected = true;
  };

  private getTabContentElements = (): HTMLPTabsItemElement[] => {
    return Array.from(this.host.querySelectorAll('p-tabs-item'));

    /*    this.tabItemElements.find((tab) =>
      tab.href !== undefined ? (this.tabType = 'aTag') : (this.tabType = 'button')
    );*/
  };
}
