import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Prop, State, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  getScrollActivePosition,
  hasPropValueChanged,
  isShadowRootParentOfKind,
  observeBreakpointChange,
  parseJSON,
  setAttribute,
  THEMES,
  unobserveBreakpointChange,
  unobserveChildren,
  validateProps,
  warnIfDeprecatedPropIsUsed,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import type { BreakpointCustomizable, PropTypes, Theme } from '../../types';
import type {
  TabsBarGradientColor,
  TabsBarGradientColorScheme,
  TabsBarSize,
  TabsBarUpdateEvent,
  TabsBarWeight,
  TabsBarWeightDeprecated,
} from './tabs-bar-utils';
import {
  getFocusedTabIndex,
  getPrevNextTabIndex,
  sanitizeActiveTabIndex,
  setBarStyle,
  TABS_BAR_SIZES,
  TABS_BAR_WEIGHTS,
} from './tabs-bar-utils';
import { getComponentCss, scrollerAnimatedCssClass } from './tabs-bar-styles';
import type { ScrollerDirection } from '../scroller/scroller-utils';
import { GRADIENT_COLOR_SCHEMES, GRADIENT_COLORS } from '../scroller/scroller-utils';

const propTypes: PropTypes<typeof TabsBar> = {
  size: AllowedTypes.breakpoint<TabsBarSize>(TABS_BAR_SIZES),
  weight: AllowedTypes.oneOf<TabsBarWeight>(TABS_BAR_WEIGHTS),
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  gradientColorScheme: AllowedTypes.oneOf<TabsBarGradientColorScheme>([undefined, ...GRADIENT_COLOR_SCHEMES]),
  gradientColor: AllowedTypes.oneOf<TabsBarGradientColor>(GRADIENT_COLORS),
  activeTabIndex: AllowedTypes.number,
};

@Component({
  tag: 'p-tabs-bar',
  shadow: true,
})
export class TabsBar {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabsBarSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabsBarWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `gradientColor` instead.
   * Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: TabsBarGradientColorScheme;

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColor?: TabsBarGradientColor = 'background-base';

  /** Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. */
  @Prop({ mutable: true }) public activeTabIndex?: number | undefined;

  /**
   * @deprecated since v3.0.0, will be removed with next major release, use `update` event instead.
   * Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabsBarUpdateEvent>;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsBarUpdateEvent>;

  @State() private tabElements: HTMLElement[] = [];

  private barElement: HTMLElement;
  private scrollerElement: HTMLPScrollerElement;
  private direction: ScrollerDirection = 'next';
  private hasPTabsParent: boolean;

  @Watch('activeTabIndex')
  public activeTabIndexHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.direction = this.activeTabIndex > oldValue || oldValue === undefined ? 'next' : 'prev';
    this.setBarStyle();
    this.scrollActiveTabIntoView();
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isShadowRootParentOfKind(this.host, 'p-tabs');
    this.setTabElements();
    this.observeBreakpointChange();
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidLoad(): void {
    // TODO: validation of active element index inside of tabs bar!
    // TODO: why not do this in connectedCallback?
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render
    this.scrollActiveTabIntoView(false);
    this.observeBreakpointChange();
  }

  public disconnectedCallback(): void {
    unobserveBreakpointChange(this.host);
    unobserveChildren(this.host);
  }

  public componentDidRender(): void {
    // 1 tick delay to prevent transition
    window.requestAnimationFrame(() => {
      this.scrollerElement.classList[this.activeTabIndex !== undefined ? 'add' : 'remove'](scrollerAnimatedCssClass);
    });
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropIsUsed<typeof TabsBar>(this, 'gradientColorScheme', 'Please use gradientColor prop instead.');
    const deprecationMap: Record<TabsBarWeightDeprecated, Exclude<TabsBarWeight, TabsBarWeightDeprecated>> = {
      semibold: 'semi-bold',
    };
    warnIfDeprecatedPropValueIsUsed<typeof TabsBar, TabsBarWeightDeprecated, TabsBarWeight>(
      this,
      'weight',
      deprecationMap
    );
    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      (deprecationMap[this.weight] || this.weight) as Exclude<TabsBarWeight, TabsBarWeightDeprecated>,
      this.theme
    );
    this.setAccessibilityAttributes();

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pScroller
        class="scroller"
        aria={{ role: 'tablist' }}
        theme={this.theme}
        gradientColorScheme={this.gradientColorScheme}
        gradientColor={this.gradientColor}
        alignScrollIndicator="top"
        ref={(el) => (this.scrollerElement = el)}
        onClick={this.onClick}
        onKeyDown={this.onKeydown}
      >
        <slot onSlotchange={this.onSlotchange} />
        <span class="bar" ref={(el) => (this.barElement = el)} />
      </PrefixedTagNames.pScroller>
    );
  }

  private onSlotchange = (): void => {
    this.setTabElements();
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
    this.setBarStyle();
  };

  private setAccessibilityAttributes = (): void => {
    this.tabElements.forEach((tab, index) => {
      const attrs = {
        role: 'tab',
        tabindex: (this.activeTabIndex || 0) === index ? '0' : '-1',
        'aria-selected': this.activeTabIndex === index ? 'true' : 'false',
      };
      /* eslint-disable-next-line guard-for-in */
      for (const key in attrs) {
        setAttribute(tab, key, attrs[key] as string);
      }
    });
  };

  private setTabElements = (): void => {
    this.tabElements = getHTMLElements(this.host, 'a,button');
  };

  private onClick = (e: MouseEvent): void => {
    const newTabIndex = this.tabElements.indexOf(e.target as HTMLElement);
    if (newTabIndex >= 0) {
      this.onTabClick(newTabIndex);
    }
  };

  private onTabClick = (newTabIndex: number): void => {
    this.update.emit({ activeTabIndex: newTabIndex });
    this.tabChange.emit({ activeTabIndex: newTabIndex });
  };

  private onKeydown = (e: KeyboardEvent): void => {
    let upcomingFocusedTabIndex: number;
    const focusedTabIndex = this.hasPTabsParent ? this.activeTabIndex || 0 : getFocusedTabIndex(this.tabElements);

    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        upcomingFocusedTabIndex = getPrevNextTabIndex('prev', this.tabElements.length, focusedTabIndex);
        break;

      case 'ArrowRight':
      case 'Right':
        upcomingFocusedTabIndex = getPrevNextTabIndex('next', this.tabElements.length, focusedTabIndex);
        break;

      case 'Home':
        upcomingFocusedTabIndex = 0;
        break;

      case 'End':
        upcomingFocusedTabIndex = this.tabElements.length - 1;
        break;

      // the slotted buttons have a different tabbing sequence in chrome and safari and it appears that on hitting
      // tab the first slotted one with tabindex=0 becomes focused instead of the one after,
      // therefor the 'Tab' case needs to be handled
      case 'Tab':
        const { target } = e as KeyboardEvent & { target: EventTarget & HTMLElement };
        const { tabIndex } = target;
        target.tabIndex = null;
        setTimeout(() => {
          target.tabIndex = tabIndex;
        });
        return;

      default:
        return;
    }

    if (this.hasPTabsParent) {
      this.onTabClick(upcomingFocusedTabIndex);
    }
    this.tabElements[upcomingFocusedTabIndex].focus();

    e.preventDefault();
  };

  private scrollActiveTabIntoView = (isSmooth = true): void => {
    // scrollAreaElement might be undefined in certain scenarios with framework routing involved
    // where the activeTabIndex watcher triggers this function before the scroller is rendered and the ref defined
    if (this.scrollerElement && this.activeTabIndex !== undefined) {
      const scrollActivePosition = getScrollActivePosition(
        this.tabElements,
        this.direction,
        this.activeTabIndex,
        this.scrollerElement
      );

      this.scrollerElement.scrollToPosition = {
        scrollPosition: scrollActivePosition,
        isSmooth,
      };
    }
  };

  private setBarStyle = (): void => {
    setBarStyle(this.tabElements, this.activeTabIndex, this.barElement);
  };

  private observeBreakpointChange = (): void => {
    if (typeof parseJSON(this.size) === 'object') {
      observeBreakpointChange(this.host, () => {
        this.setBarStyle();
        this.scrollActiveTabIntoView(false);
      });
    }
  };
}
