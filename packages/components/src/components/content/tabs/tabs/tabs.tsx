import { Component, h, Element, Prop, State, Host, Event, EventEmitter, Watch } from '@stencil/core';
import { getPrefixedTagNames, prefix } from '../../../../utils';
import { TabChangeEvent, TextWeight, Theme } from '../../../../types';
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

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: 'default' | 'surface' = 'default';

  /** Emitted when active tab is changed. */
  @Event() public tabChange: EventEmitter<TabChangeEvent>;

  @State() public activeTabIndex;
  @State() public tabsItemElements: HTMLPTabsItemElement[] = [];

  private hostObserver: MutationObserver;

  @Watch('activeTabIndex')
  public activeTabHandler(): void {
    this.setTabsItemProperties();
    this.setAccessibilityAttributes();
    this.tabChange.emit({activeTabIndex: this.activeTabIndex});
  }

  public connectedCallback(): void {
    this.defineTabsItemElements();
    this.setInitialActiveTabIndex();
    this.setTabsItemProperties();
    this.setAccessibilityAttributes();
    this.initMutationObserver();
  }

  public disconnectedCallback(): void {
    this.disconnectMutationObserver();
  }

  public render(): JSX.Element {
    const tabsClasses = {
      [prefix('tabs')]: true
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-tabs-bar']);
//TODO: check map function for right active tab
    return (
      <Host>
        <div class={tabsClasses}>
          <PrefixedTagNames.pTabsBar
            size={this.size}
            weight={this.weight}
            theme={this.theme}
            gradientColorScheme={this.gradientColorScheme}
            activeTabIndex={this.activeTabIndex}
            onTabChange={(e) => this.handleTabClick(e.detail.activeTabIndex)}
          >
            {this.tabsItemElements.map((tab, index) => (
              <button type="button" aria-controls={`tab-panel-${index}`}>
                {tab.label}
              </button>
            ))}
          </PrefixedTagNames.pTabsBar>
        </div>
        <slot />
      </Host>
    );
  }

  private defineTabsItemElements = (): void => {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-tabs-item']);
    this.tabsItemElements = getHTMLElements(this.host, PrefixedTagNames.pTabsItem) as HTMLPTabsItemElement[];
  };

  private setInitialActiveTabIndex = (): void => {
    const index = this.tabsItemElements.findIndex((tab) => tab.selected);
    this.activeTabIndex = index >= 0 ? index : 0;
  };

  private setTabsItemProperties = (): void => {
    for (const [index, tab] of Object.entries(this.tabsItemElements)) {
      tab.removeAttribute('selected');
      tab.selected = this.activeTabIndex === +index;
    }
  };

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of Object.entries(this.tabsItemElements)) {
      const attrs = {
        role: 'tabpanel',
        hidden: `${!tab.selected}`,
        id: prefix(`tab-panel-${index}`),
        'aria-labelledby': `tab-item-${index}`
      };
      for (const [key, value] of Object.entries(attrs)) {
        tab.setAttribute(key, value);
      }
    }
  };

  private initMutationObserver = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes')) {
        this.defineTabsItemElements();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'selected']
    });
  };

  private disconnectMutationObserver = (): void => {
    this.hostObserver.disconnect();
  };

  private handleTabClick = (newTabIndex: number = this.activeTabIndex): void => {
    this.activeTabIndex = newTabIndex;
  };
}
