import { Component, Element, Event, type EventEmitter, Host, type JSX, Prop, State, Watch, h } from '@stencil/core';
import { getSlottedAnchorStyles } from '../../../styles';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../../types';
import {
  AllowedTypes,
  THEMES,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  removeAttribute,
  setAttribute,
  setAttributes,
  throwIfChildrenAreNotOfKind,
  validateProps,
  warnIfDeprecatedPropIsUsed,
} from '../../../utils';
import { GRADIENT_COLORS, GRADIENT_COLOR_SCHEMES } from '../../scroller/scroller-utils';
import { TABS_BAR_SIZES, TABS_BAR_WEIGHTS, type TabsBarUpdateEventDetail } from '../../tabs-bar/tabs-bar-utils';
import { getComponentCss } from './tabs-styles';
import {
  type TabsGradientColor,
  type TabsGradientColorScheme,
  type TabsSize,
  type TabsUpdateEventDetail,
  type TabsWeight,
  syncTabsItemsProps,
} from './tabs-utils';

const propTypes: PropTypes<typeof Tabs> = {
  size: AllowedTypes.breakpoint<TabsSize>(TABS_BAR_SIZES),
  weight: AllowedTypes.oneOf<TabsWeight>(TABS_BAR_WEIGHTS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  gradientColorScheme: AllowedTypes.oneOf<TabsGradientColorScheme>([undefined, ...GRADIENT_COLOR_SCHEMES]),
  gradientColor: AllowedTypes.oneOf<TabsGradientColor>([undefined, ...GRADIENT_COLORS]),
  activeTabIndex: AllowedTypes.number,
};

/**
 * @slot {"name": "", "description": "Default slot for the `p-tabs-item` tags." }
 *
 * @controlled { "props": ["activeTabIndex"], "event": "update", "isInternallyMutated": true }
 */
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

  /**
   * @deprecated since v3.29.0, will be removed with next major release.
   * Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColor?: TabsGradientColor;

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabsUpdateEventDetail>;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsUpdateEventDetail>;

  @State() private tabsItemElements: HTMLPTabsItemElement[] = [];

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.update.emit({ activeTabIndex: newValue });
    this.tabChange.emit({ activeTabIndex: newValue });
  }

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentWillLoad(): void {
    this.defineTabsItemElements();
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.defineTabsItemElements);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    this.setAccessibilityAttributes();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof Tabs>(this, 'gradientColorScheme', 'Prop can be omitted, gradient handling is managed internally.');
    warnIfDeprecatedPropIsUsed<typeof Tabs>(
      this,
      'gradientColor',
      'Prop can be omitted, gradient handling is managed internally.'
    );
    attachComponentCss(this.host, getComponentCss);
    syncTabsItemsProps(this.tabsItemElements, this.theme);

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
          onTabChange={(e: Event) => e.stopPropagation()} // prevent double event emission because of identical name
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
    throwIfChildrenAreNotOfKind(this.host, 'p-tabs-item');
    this.tabsItemElements = Array.from(this.host.children) as HTMLPTabsItemElement[];
  };

  private setAccessibilityAttributes = (): void => {
    this.tabsItemElements.forEach((tab, index) => {
      const attrs = {
        role: 'tabpanel',
        'aria-label': tab.label,
      };
      setAttributes(tab, attrs);

      if (index === this.activeTabIndex) {
        removeAttribute(tab, 'hidden');
        setAttribute(tab, 'tabindex', '0');
      } else {
        setAttribute(tab, 'hidden');
        removeAttribute(tab, 'tabindex');
      }
    });
  };

  private onTabsBarUpdate = (e: CustomEvent<TabsBarUpdateEventDetail>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
