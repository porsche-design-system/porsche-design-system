import { Component, h, Element, Prop, Host, Watch, State } from '@stencil/core';
import { prefix } from '../../../utils';
import { TextWeight } from '../../../types';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  @State() public tabsItems: HTMLPTabsItemElement[] = Array.from(this.host.querySelectorAll('p-tabs-item'));

  @Prop({ reflect: true }) public activeTab?: number = this.tabsItems.findIndex((tab) => tab.selected);

  private hostObserver: MutationObserver;

  @Watch('activeTab')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  @Watch('tabsItems')
  public handleTabsItemChange(): void {
    this.handleTabChange();
  }

  public connectedCallback(): void {
    this.updateTabItems();
    this.handleTabChange();
    this.observeHost();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabHeaderClasses = {
      [prefix(`tabs__header--align-${this.align}`)]: true,
      [prefix('tabs__header')]: true
    };

    const tabContentClasses = {
      [prefix('tabs__content')]: true
    };

    return (
      <Host>
        <nav class={tabHeaderClasses}>
          {this.tabsItems.map((tab, index) => {
            const tabButtonClasses = {
              [prefix('tabs__button')]: true,
              [prefix(`tabs__button--${this.weight}`)]: true,
              [prefix('tabs__button--selected')]: tab.selected,
              [prefix('tabs__button--disabled')]: tab.disabled
            };

            const Tag = tab.href === undefined ? 'button' : 'a';
            const props = (({ href, target, disabled }) => ({ href, target, disabled }))(tab);

            return (
              // use p-button-pure?
              <Tag class={tabButtonClasses} role="tab" {...props} onClick={() => this.handleTabChange(index)}>
                {tab.label}
              </Tag>
            );
          })}
        </nav>
        <div class={tabContentClasses}>
          <slot />
        </div>
      </Host>
    );
  }

  private resetTabs = (): void => {
    this.tabsItems.forEach((tab) => (tab.selected = false));
  };

  private setActiveTab = (index: number): void => {
    const allTabElements = this.tabsItems;
    const maxIndex = allTabElements.length - 1;
    this.activeTab = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    allTabElements[this.activeTab].selected = true;
  };

  private handleTabChange = (newActiveTab?: number): void => {
    this.resetTabs();
    this.setActiveTab(newActiveTab ?? this.activeTab);
  };

  private updateTabItems = (): void => {
    this.tabsItems = Array.from(this.host.querySelectorAll('p-tabs-item'));
  };

  private observeHost(): void {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'href', 'target']
    });
  }
}
