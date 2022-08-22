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
  THEMES_EXTENDED_ELECTRIC,
  unobserveChildren,
  validateProps,
} from '../../../../utils';
import type { BreakpointCustomizable, PropTypes, ThemeExtendedElectric } from '../../../../types';
import type {
  TabChangeEvent,
  TabGradientColorTheme,
  TabSize,
  TabWeight,
} from '../../../navigation/tabs-bar/tabs-bar-utils';
import { TAB_SIZES, TAB_WEIGHTS } from '../../../navigation/tabs-bar/tabs-bar-utils';
import { getComponentCss } from './tabs-styles';
import { GRADIENT_COLOR_THEMES } from '../../../common/scroller/scroller-utils';

const propTypes: PropTypes<typeof Tabs> = {
  size: AllowedTypes.breakpoint<TabSize>(TAB_SIZES),
  weight: AllowedTypes.oneOf<TabWeight>(TAB_WEIGHTS),
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(THEMES_EXTENDED_ELECTRIC),
  gradientColorScheme: AllowedTypes.oneOf<TabGradientColorTheme>(GRADIENT_COLOR_THEMES),
  activeTabIndex: AllowedTypes.number,
};

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
  @Prop() public gradientColorScheme?: TabGradientColorTheme = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabChangeEvent>;

  @State() private tabsItemElements: HTMLPTabsItemElement[] = [];

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.tabChange.emit({ activeTabIndex: newValue });
  }

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
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

  public componentWillRender(): void {
    validateProps(this, propTypes);
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

  private onTabChange = (e: CustomEvent<TabChangeEvent>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
