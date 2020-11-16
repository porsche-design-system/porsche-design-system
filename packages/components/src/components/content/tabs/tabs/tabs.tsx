import { Component, h, Element, Prop, State, Host, Event, EventEmitter, Watch } from '@stencil/core';
import { BreakpointCustomizable, getPrefixedTagNames, prefix } from '../../../../utils';
import { TabChangeEvent, TabGradientColorTheme, TabSize, TabWeight, Theme } from '../../../../types';
import { getHTMLElements } from '../../../../utils/selector-helper';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true,
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
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabChangeEvent>;

  @State() public tabsItemElements: HTMLPTabsItemElement[] = [];

  private hostObserver: MutationObserver;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.tabChange.emit({ activeTabIndex: newValue });
  }

  public connectedCallback(): void {
    this.defineTabsItemElements();
    this.setAccessibilityAttributes();
    this.initMutationObserver();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsClasses = prefix('tabs');

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
            onTabChange={this.handleTabChange}
          >
            {this.tabsItemElements.map((tab, index) => (
              <button type="button" id={`tab-item-${index}`} aria-controls={`tab-panel-${index}`}>
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

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of Object.entries(this.tabsItemElements)) {
      const attrs = {
        role: 'tabpanel',
        id: `tab-panel-${index}`,
        'aria-labelledby': `tab-item-${index}`,
      };

      for (const [key, value] of Object.entries(attrs)) {
        tab.setAttribute(key, value);
      }

      if (+index === this.activeTabIndex) {
        tab.removeAttribute('hidden');
      } else {
        tab.setAttribute('hidden', '');
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
      attributeFilter: ['label'],
    });
  };

  private handleTabChange = (e: CustomEvent<TabChangeEvent>): void => {
    const {
      detail: { activeTabIndex },
    } = e;
    e.stopPropagation(); // prevent double event emission because of identical name

    this.activeTabIndex = activeTabIndex;
  };
}
