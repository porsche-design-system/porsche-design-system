import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import {
  getHTMLElements,
  getPrefixedTagNames,
  removeAttribute,
  setAttribute,
  SubsetTextWeight,
} from '../../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../../types';
import type { TabChangeEvent, TabGradientColorTheme, TabSize } from '../../../navigation/tabs-bar/tabs-bar-utils';

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
  @Prop() public weight?: SubsetTextWeight = 'regular';

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
    this.initMutationObserver();
  }

  public componentDidLoad(): void {
    this.setAccessibilityAttributes();
  }

  public componentDidUpdate(): void {
    this.setAccessibilityAttributes();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host>
        <PrefixedTagNames.pTabsBar
          class="tabs-bar"
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
        <slot />
      </Host>
    );
  }

  private defineTabsItemElements = (): void => {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    this.tabsItemElements = getHTMLElements(this.host, PrefixedTagNames.pTabsItem);
  };

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of Object.entries(this.tabsItemElements)) {
      const attrs = {
        role: 'tabpanel',
        id: `tab-panel-${index}`,
        'aria-labelledby': `tab-item-${index}`,
      };

      for (const [key, value] of Object.entries(attrs)) {
        setAttribute(tab, key, value);
      }

      if (+index === this.activeTabIndex) {
        removeAttribute(tab, 'hidden');
      } else {
        setAttribute(tab, 'hidden');
      }
    }
  };

  private initMutationObserver = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.some(({ type }) => type === 'childList' || type === 'attributes')) {
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
