import { Component, Element, Event, EventEmitter, forceUpdate, h, Host, Prop, State, Watch } from '@stencil/core';
import { getPrefixedTagNames, observeProperties, removeAttribute, setAttribute } from '../../../../utils';
import type { BreakpointCustomizable, Theme } from '../../../../types';
import type {
  TabChangeEvent,
  TabGradientColorTheme,
  TabWeight,
  TabSize,
} from '../../../navigation/tabs-bar/tabs-bar-utils';

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
    this.initMutationObserver();
    this.observeProperties();
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
          onTabChange={this.onTabChange}
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
    this.tabsItemElements = Array.from(this.host.children) as HTMLPTabsItemElement[];
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
        setAttribute(tab, 'tabindex', '0');
      } else {
        setAttribute(tab, 'hidden');
        removeAttribute(tab, 'tabindex');
      }
    }
  };

  private initMutationObserver = (): void => {
    // host observer tracks children being added or removed
    this.hostObserver = new MutationObserver(() => {
      this.defineTabsItemElements();
      this.observeProperties(); // since attribute won't be there when used with angular or react wrapper
    });
    this.hostObserver.observe(this.host, {
      childList: true,
    });
  };

  private observeProperties = (): void => {
    this.tabsItemElements.forEach((el) => observeProperties(el, ['label'], () => forceUpdate(this.host)));
  };

  private onTabChange = (e: CustomEvent<TabChangeEvent>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
