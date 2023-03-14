import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, h, Prop, State, Watch } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  getScrollActivePosition,
  isShadowRootParentOfKind,
  observeBreakpointChange,
  observeChildren,
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
  TabsBarChangeEvent,
  TabsBarGradientColor,
  TabsBarGradientColorScheme,
  TabsBarSize,
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
import { getComponentCss } from './tabs-bar-styles';
import type { ScrollerDirection } from '../scroller/scroller-utils';
import { GRADIENT_COLORS, GRADIENT_COLOR_SCHEMES } from '../scroller/scroller-utils';

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
   * @deprecated since v3.0.0, will be removed with next major release, use `change` event instead.
   * Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabsBarChangeEvent>;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public change: EventEmitter<TabsBarChangeEvent>;

  @State() private tabElements: HTMLElement[] = [];

  private barElement: HTMLElement;
  private prevActiveTabIndex: number;
  private direction: ScrollerDirection = 'next';
  private hasPTabsParent: boolean;
  private scrollerElement: HTMLPScrollerElement;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    // can be null if removeAttribute() is used
    if (newValue === null) {
      this.activeTabIndex = undefined;
    }
    this.prevActiveTabIndex = oldValue;
    this.direction = newValue > oldValue || oldValue === undefined ? 'next' : 'prev';
    this.scrollActiveTabIntoView();
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isShadowRootParentOfKind(this.host, 'p-tabs');
    this.setTabElements();

    // TODO: wouldn't a slot change listener be good enough? https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event
    observeChildren(this.host, () => {
      this.setTabElements();
      this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      this.setBarStyle();
      this.setAccessibilityAttributes();
    });

    this.observeBreakpointChange();
  }

  public componentDidLoad(): void {
    // TODO: validation of active element index inside of tabs bar!
    // TODO: why not do this in connectedCallback?
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render

    if (!(this.direction === 'next' && this.activeTabIndex === undefined)) {
      // skip scrolling on first render when no activeElementIndex is set
      this.scrollActiveTabIntoView(false);
    }

    this.addEventListeners();
    this.observeBreakpointChange();

    // setBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    this.setBarStyle();
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have status bar defined and proper calculation
    this.setBarStyle();
    this.setAccessibilityAttributes();
  }

  public disconnectedCallback(): void {
    unobserveBreakpointChange(this.host);
    unobserveChildren(this.host);
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

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pScroller
        class="scroller"
        role="tablist"
        theme={this.theme}
        gradientColorScheme={this.gradientColorScheme}
        gradientColor={this.gradientColor}
        alignScrollIndicator="top"
        ref={(el) => (this.scrollerElement = el)}
      >
        <slot />
        <span class="bar" ref={(el) => (this.barElement = el)} />
      </PrefixedTagNames.pScroller>
    );
  }

  private setAccessibilityAttributes = (): void => {
    this.tabElements.forEach((tab, index) => {
      const tabIndex = this.activeTabIndex || 0;
      const isFocusable = tabIndex === +index;
      const isSelected = this.activeTabIndex === +index;
      const attrs = {
        role: 'tab',
        tabindex: isFocusable ? '0' : '-1',
        'aria-selected': isSelected ? 'true' : 'false',
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

  private addEventListeners = (): void => {
    this.scrollerElement.addEventListener('click', (e) => {
      const newTabIndex = this.tabElements.indexOf(e.target as HTMLElement);

      if (newTabIndex >= 0) {
        this.onTabClick(newTabIndex);
      }
    });
    this.scrollerElement.addEventListener('keydown', this.onKeydown);
  };

  private onTabClick = (newTabIndex: number): void => {
    this.change.emit({ activeTabIndex: newTabIndex });
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

      case 'Enter':
        this.onTabClick(focusedTabIndex);
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
    // where the watcher triggers this function way before componentDidLoad calls defineHTMLElements
    if (this.scrollerElement) {
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
    setBarStyle(this.tabElements, this.activeTabIndex, this.barElement, this.prevActiveTabIndex);
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
