import { Component, h, Element, Prop, Host, Watch, State } from '@stencil/core';
import { isTouchDevice, prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: 'small' | 'medium' = 'medium';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  @State() public tabsItems: HTMLPTabsItemElement[] = Array.from(this.host.querySelectorAll('p-tabs-item'));

  /** Defines the tab to be activated (index: zero-based). */
  @Prop({reflect: true}) public activeTab?: number = this.tabsItems.findIndex((tab) => tab.selected);

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;
  private firstTab: HTMLElement;
  private lastTab: HTMLElement;

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

  public componentDidLoad(): void {
    this.observeIntersection();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabHeaderClasses = {
      [prefix('tabs__header')]: true
    };

    const tabActionClasses = {
      [prefix('tabs__action')]: true
    };

    const tabPrevClasses = {
      ...tabActionClasses,
      [prefix('tabs__action--prev')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true
    };

    const tabNextClasses = {
      ...tabActionClasses,
      [prefix('tabs__action--next')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true
    };

    const tabNavClasses = {
      [prefix('tabs__nav')]: true
    };

    const tabButtonClasses = {
      [prefix('tabs__button')]: true,
      [prefix(`tabs__button--theme-${this.theme}`)]: true,
      [prefix(`tabs__button--size-${this.size}`)]: true,
      [prefix(`tabs__button--weight-${this.weight}`)]: true
    };

    return (
      <Host>
        <div class={tabHeaderClasses}>
          <div class={tabPrevClasses}>
            <p-button-pure theme={this.theme} hide-label="true" icon="arrow-head-left">Prev</p-button-pure>
          </div>
          <div class={tabNextClasses}>
            <p-button-pure theme={this.theme} hide-label="true" icon="arrow-head-right">Next</p-button-pure>
          </div>
          <nav class={tabNavClasses}>

            {this.tabsItems.map((tab, index) => {
              const extendedTabButtonClasses = {
                ...tabButtonClasses,
                [prefix('tabs__button--selected')]: tab.selected
              };

              const Tag = tab.href === undefined ? 'button' : 'a';
              const props = (({href, target}) => ({href, target}))(tab);

              return (
                <Tag class={extendedTabButtonClasses} role="tab" {...props} onClick={() => this.handleTabChange(index)}>
                  {tab.label}
                </Tag>
              );
            })}
          </nav>
        </div>
        <slot/>
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
      if (mutations.filter(({type}) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'href', 'target']
    });
  }

  private observeIntersection(): void {
    const actions = this.host.shadowRoot.querySelectorAll('.p-tabs__action');
    const prev = this.host.shadowRoot.querySelector('.p-tabs__action--prev');
    const next = this.host.shadowRoot.querySelector('.p-tabs__action--next');

    if (isTouchDevice()) {
      for (const action of Object.values(actions)) {
        action.classList.add('p-tabs__action--hidden');
      }
      return;
    }

    const tabs = this.host.shadowRoot.querySelectorAll('.p-tabs__button');
    this.firstTab = tabs[0] as HTMLElement;
    this.lastTab = tabs[tabs.length - 1] as HTMLElement;

    this.intersectionObserver = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const entry of entries) {
          const action = entry.target === this.firstTab ? prev : next;
          if (action === prev && entry.isIntersecting) {
            action.classList.add('p-tabs__action--hidden');
            action.classList.remove('p-tabs__action--visible');
          } else if (action === next && !entry.isIntersecting) {
            action.classList.remove('p-tabs__action--hidden');
            action.classList.add('p-tabs__action--visible');
          } else if (action === next && entry.isIntersecting) {
            action.classList.add('p-tabs__action--hidden');
            action.classList.remove('p-tabs__action--visible');
          } else {
            action.classList.remove('p-tabs__action--hidden');
            action.classList.add('p-tabs__action--visible');
          }
        }
      },
      {threshold: 0.75}
    );

    this.intersectionObserver.observe(this.firstTab);
    this.intersectionObserver.observe(this.lastTab);
  }
}
