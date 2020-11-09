import { Component, h, Element, Prop, State, Host, Listen } from '@stencil/core';
import { BreakpointCustomizable, getPrefixedTagNames, prefix } from '../../../../utils';
import { TabChangeEvent, TabGradientColorTheme, TabSize, TabWeight, Theme } from '../../../../types';
import { getHTMLElements } from '../../../../utils/selector-helper';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: TabGradientColorTheme = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop() public activeTabIndex?: number = 0;

  @State() public tabsItemElements: HTMLPTabsItemElement[] = [];

  private hostObserver: MutationObserver;

  @Listen('tabChange')
  public activeTabHandler(): void {
    this.setAccessibilityAttributes();
  }

  public connectedCallback(): void {
    this.defineTabsItemElements();
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
    // TODO: check map function for right active tab
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
        {this.tabsItemElements.map(
          (tabsItem, index) => index === this.activeTabIndex && <div innerHTML={tabsItem.innerHTML} />
        )}
      </Host>
    );
  }

  private defineTabsItemElements = (): void => {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-tabs-item']);
    this.tabsItemElements = getHTMLElements(this.host, PrefixedTagNames.pTabsItem) as HTMLPTabsItemElement[];
  };

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of Object.entries(this.tabsItemElements)) {
      const attrs = {
        role: 'tabpanel',
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
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes').length) {
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
