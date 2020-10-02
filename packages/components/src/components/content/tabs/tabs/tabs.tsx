import { Component, h, Element, Prop, State, Host } from '@stencil/core';
import { getPrefixedTagNames, prefix } from '../../../../utils';
import { TextWeight, Theme } from '../../../../types';
import { getHTMLElements } from '../../../../utils/selector-helper';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: 'small' | 'medium' = 'small';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: 'default' | 'surface' = 'default';

  @State() public tabsItems: HTMLPTabsItemElement[] = [];
  @State() public tabs: HTMLElement[] = [];
  @State() public activeTabIndex: number;

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;

  public connectedCallback(): void {
    this.updateTabItems();
    this.activeTabIndex = this.tabsItems.findIndex((tab) => tab.selected);
    this.setActiveTab(this.activeTabIndex);
    this.tabsItems.forEach(this.setAccessibilityAttributes);
    this.initObserveHost();
  }

  public componentDidLoad(): void {
    this.initView();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsClasses = {
      [prefix('tabs')]: true
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-tabs-bar']);

    return (
      <Host>
        <div class={tabsClasses}>
          <PrefixedTagNames.pTabsBar
            size={this.size}
            weight={this.weight}
            theme={this.theme}
            gradientColorScheme={this.gradientColorScheme}
            activeTabIndex={this.activeTabIndex}
          >
            {this.tabsItems.map((tab, index) => (
              <button
                type="button"
                aria-controls={prefix(`tab-panel-${index}`)}
                onClick={() => this.handleTabClick(index)}
              >
                {tab.label}
              </button>
            ))}
          </PrefixedTagNames.pTabsBar>
        </div>
        <slot />
      </Host>
    );
  }

  private initView = (): void => {
    const tabSelector = `.${prefix('tabs__tab')}`;
    this.tabs = getHTMLElements(this.host.shadowRoot, tabSelector);
  };

  private initObserveHost = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label']
    });
  };

  private resetTabs = (): void => {
    for (const tab of this.tabsItems) {
      tab.removeAttribute('selected');
    }
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.tabsItems.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    this.tabsItems[this.activeTabIndex].selected = true;
  };

  private handleTabChange = (newTabIndex: number = this.activeTabIndex): void => {
    this.resetTabs();
    this.setActiveTab(newTabIndex);
  };

  private handleTabClick = (newTabIndex: number): void => {
    if (this.activeTabIndex !== newTabIndex) {
      this.handleTabChange(newTabIndex);
    }
  };

  private updateTabItems = (): void => {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-tabs-item']);
    this.tabsItems = getHTMLElements(this.host, PrefixedTagNames.pTabsItem) as HTMLPTabsItemElement[];
  };

  private setAccessibilityAttributes = (tab: HTMLPTabsItemElement, index: number): void => {
    const attrs = {
      role: 'tabpanel',
      hidden: `${!tab.selected}`,
      id: prefix(`tab-panel-${index}`),
      'aria-labelledby': prefix(`tab-item-${index}`)
    };
    // eslint-disable-next-line
    for (const key in attrs) {
      tab.setAttribute(key, attrs[key]);
    }
  };
}
