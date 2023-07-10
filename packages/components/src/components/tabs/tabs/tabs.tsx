import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Host, Prop, State, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  removeAttribute,
  setAttribute,
  THEMES,
  throwIfChildrenAreNotOfKind,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import type { TabsBarUpdateEvent } from '../../tabs-bar/tabs-bar-utils';
import { TABS_BAR_SIZES, TABS_BAR_WEIGHTS } from '../../tabs-bar/tabs-bar-utils';
import { getComponentCss } from './tabs-styles';
import { GRADIENT_COLOR_SCHEMES, GRADIENT_COLORS } from '../../scroller/scroller-utils';
import type { TabsGradientColor, TabsGradientColorScheme, TabsSize, TabsUpdateEvent, TabsWeight } from './tabs-utils';
import { syncTabsItemsProps } from './tabs-utils';

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
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   *  Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabsUpdateEvent>;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsUpdateEvent>;

  @State() private tabsItemElements: HTMLPTabsItemElement[] = [];

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.update.emit({ activeTabIndex: newValue });
    this.tabChange.emit({ activeTabIndex: newValue });
  }

  public connectedCallback(): void {
    this.defineTabsItemElements();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
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
          onUpdate={this.onTabsBarUpdate}
          onTabChange={(e) => e.stopPropagation()}
        >
          {this.tabsItemElements.map((tab, index) => (
            <button key={index} type="button">
              {tab.label}
            </button>
          ))}
        </PrefixedTagNames.pTabsBar>
        <slot onSlotchange={this.onSlotchange} />
      </Host>
    );
  }

  private onSlotchange = (): void => {
    this.defineTabsItemElements();
  };

  private defineTabsItemElements = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-tabs-item');
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

  private onTabsBarUpdate = (e: CustomEvent<TabsBarUpdateEvent>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
