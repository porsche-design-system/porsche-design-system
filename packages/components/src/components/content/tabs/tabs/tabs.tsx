import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, forceUpdate, Host, Prop, State, Watch, h } from '@stencil/core';
import {
  attachComponentCss,
  getPrefixedTagNames,
  observeChildren,
  observeProperties,
  removeAttribute,
  setAttribute,
  unobserveChildren,
} from '../../../../utils';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../../types';
import type { TabChangeEvent, TabSize, TabWeight } from '../../../navigation/tabs-bar/tabs-bar-utils';
import { getComponentCss } from './tabs-styles';
import type { GradientColorTheme } from '../../../common/scroller/scroller-utils';

@Component({
  tag: 'p-tabs',
  shadow: true,
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: GradientColorTheme = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabChangeEvent>;

  @State() public tabsItemElements: HTMLPTabsItemElement[] = [];

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.tabChange.emit({ activeTabIndex: newValue });
  }

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
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
    unobserveChildren(this.host);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host>
        <PrefixedTagNames.pTabsBar
          class="root"
          size={this.size}
          weight={this.weight}
          theme={this.theme}
          gradientColorScheme={this.gradientColorScheme}
          activeTabIndex={this.activeTabIndex}
          onTabChange={this.onTabChange}
        >
          {this.tabsItemElements.map((tab) => (
            <button type="button">{tab.label}</button>
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
        'aria-label': tab.label,
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
    observeChildren(this.host, () => {
      this.defineTabsItemElements();
      this.observeProperties(); // since attribute won't be there when used with angular or react wrapper
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
