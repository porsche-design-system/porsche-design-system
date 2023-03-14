import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, forceUpdate, h, Host, Prop, State, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  observeChildren,
  observeProperties,
  removeAttribute,
  setAttribute,
  THEMES,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { TabsBarChangeEvent } from '../../tabs-bar/tabs-bar-utils';
import { TABS_BAR_SIZES, TABS_BAR_WEIGHTS } from '../../tabs-bar/tabs-bar-utils';
import { getComponentCss } from './tabs-styles';
import { GRADIENT_COLORS, GRADIENT_COLOR_SCHEMES } from '../../scroller/scroller-utils';
import { syncTabsItemsProps } from './tabs-utils';
import type { TabsChangeEvent, TabsGradientColor, TabsGradientColorScheme, TabsSize, TabsWeight } from './tabs-utils';

const propTypes: PropTypes<typeof Tabs> = {
  size: AllowedTypes.breakpoint<TabsSize>(TABS_BAR_SIZES),
  weight: AllowedTypes.oneOf<TabsWeight>(TABS_BAR_WEIGHTS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  gradientColorScheme: AllowedTypes.oneOf<TabsGradientColorScheme>([undefined, ...GRADIENT_COLOR_SCHEMES]),
  gradientColor: AllowedTypes.oneOf<TabsGradientColor>(GRADIENT_COLORS),
  activeTabIndex: AllowedTypes.number,
};

@Component({
  tag: 'p-tabs',
  shadow: true,
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabsSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabsWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `gradientColor` instead.
   * Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: TabsGradientColorScheme;

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColor?: TabsGradientColor = 'background-base';

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `change` event instead.
   *  Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabsChangeEvent>;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public change: EventEmitter<TabsChangeEvent>;

  @State() private tabsItemElements: HTMLPTabsItemElement[] = [];

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.change.emit({ activeTabIndex: newValue });
    this.tabChange.emit({ activeTabIndex: newValue });
  }

  public connectedCallback(): void {
    this.defineTabsItemElements();
    observeChildren(this.host, () => {
      this.defineTabsItemElements();
      this.observeProperties(); // since attribute won't be there when used with angular or react wrapper
    });
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
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Tabs>(this, 'gradientColorScheme', 'Please use gradientColor prop instead.');
    attachComponentCss(this.host, getComponentCss);
    syncTabsItemsProps(this.host, this.theme);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pTabsBar
          class="root"
          size={this.size}
          weight={this.weight}
          theme={this.theme}
          gradientColorScheme={this.gradientColorScheme}
          gradientColor={this.gradientColor}
          activeTabIndex={this.activeTabIndex}
          onChange={this.onTabsBarChange}
          onTabChange={(e) => e.stopPropagation()}
        >
          {this.tabsItemElements.map((tab, index) => (
            <button key={index} type="button">
              {tab.label}
            </button>
          ))}
        </PrefixedTagNames.pTabsBar>
        <slot />
      </Host>
    );
  }

  private defineTabsItemElements = (): void => {
    // TODO: validation? this could be any kind of dom node
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

  private observeProperties = (): void => {
    this.tabsItemElements.forEach((el) => observeProperties(el, ['label'], () => forceUpdate(this.host)));
  };

  private onTabsBarChange = (e: CustomEvent<TabsBarChangeEvent>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
