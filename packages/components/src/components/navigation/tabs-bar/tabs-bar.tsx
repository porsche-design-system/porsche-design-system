import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, Prop, State, Watch, h } from '@stencil/core';
import type { PropTypes } from '../../../utils';
import {
  AllowedTypes,
  attachComponentCss,
  getHTMLElements,
  getPrefixedTagNames,
  getScrollActivePosition,
  observeChildren,
  parseJSON,
  setAttribute,
  unobserveChildren,
  validateProps,
} from '../../../utils';
import { isShadowRootParentOfKind } from '../../../utils/dom'; // separate import is needed for lifecycleValidation.spec to pass
import type { TabChangeEvent, TabGradientColorTheme, TabSize, TabWeight } from './tabs-bar-utils';
import {
  getFocusedTabIndex,
  getPrevNextTabIndex,
  sanitizeActiveTabIndex,
  setBarStyle,
  TAB_SIZES,
  TAB_WEIGHTS,
} from './tabs-bar-utils';
import { getComponentCss } from './tabs-bar-styles';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import { THEMES_EXTENDED_ELECTRIC } from '../../../types';
import type { Direction } from '../../common/scroller/scroller-utils';
import { getScrollerElements, GRADIENT_COLOR_THEMES } from '../../common/scroller/scroller-utils';
import {
  resizeObserverFallback,
  observeResize,
  unobserveResize,
  useResizeObserverFallback,
} from '../../../utils/resize-observer';

const propTypes: PropTypes<typeof TabsBar> = {
  size: AllowedTypes.breakpoint<TabSize>(TAB_SIZES),
  weight: AllowedTypes.oneOf<TabWeight>(TAB_WEIGHTS),
  theme: AllowedTypes.oneOf<ThemeExtendedElectric>(THEMES_EXTENDED_ELECTRIC),
  gradientColorScheme: AllowedTypes.oneOf<TabGradientColorTheme>(GRADIENT_COLOR_THEMES),
  activeTabIndex: AllowedTypes.number,
};

@Component({
  tag: 'p-tabs-bar',
  shadow: true,
})
export class TabsBar {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: ThemeExtendedElectric = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: TabGradientColorTheme = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. */
  @Prop() public activeTabIndex?: number | undefined;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabChangeEvent>;

  @State() private tabElements: HTMLElement[] = [];

  private intersectionObserver: IntersectionObserver;
  private barElement: HTMLElement;
  private prevActiveTabIndex: number;
  private direction: Direction = 'next';
  private hasPTabsParent: boolean;
  private scrollAreaElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private scrollerElement: HTMLElement;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.prevActiveTabIndex = oldValue;
    this.direction = this.activeTabIndex > this.prevActiveTabIndex || oldValue === undefined ? 'next' : 'prev';
    this.scrollActiveTabIntoView();
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isShadowRootParentOfKind(this.host, 'pTabs');
    this.setTabElements();
    observeChildren(this.host, () => {
      this.setTabElements();
      this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      this.setBarStyle();
      this.setAccessibilityAttributes();
    });
    if (this.isSizeBreakpointCustomizable()) {
      if (useResizeObserverFallback) {
        resizeObserverFallback(this.host, () => {
          this.setBarStyle();
          this.scrollActiveTabIntoView(false);
        });
      }
    }
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    // TODO: validation of active element index inside of tabs bar!
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render

    if (!(this.direction === 'next' && this.activeTabIndex === undefined)) {
      // skip scrolling on first render when no activeElementIndex is set
      this.scrollActiveTabIntoView(false);
    }

    this.addEventListeners();
    if (this.isSizeBreakpointCustomizable()) {
      observeResize(
        this.scrollerElement,
        () => {
          this.setBarStyle();
          this.scrollActiveTabIntoView(false);
        },
        { box: 'border-box' }
      );
    }

    // setBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    this.setBarStyle();
  }

  public componentWillRender(): void {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.theme);
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have status bar defined and proper calculation
    this.setBarStyle();
    this.setAccessibilityAttributes();
  }

  public disconnectedCallback(): void {
    if (this.isSizeBreakpointCustomizable()) {
      unobserveResize(this.scrollerElement);
    }
    unobserveChildren(this.host);
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pScroller
        class="scroller"
        role="tablist"
        theme={this.theme}
        gradientColorScheme={this.gradientColorScheme}
        ref={(el) => (this.scrollerElement = el)}
        prevNextButtonJssStyle={{
          top: 'calc(50% - .5em)',
          transform: 'translate3d(0,calc(-50% + .375em),0)',
        }}
      >
        <slot />
        <span class="bar" ref={(el) => (this.barElement = el)} />
      </PrefixedTagNames.pScroller>
    );
  }

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of Object.entries(this.tabElements)) {
      const tabIndex = this.activeTabIndex ?? 0;
      const isFocusable = tabIndex === +index;
      const isSelected = this.activeTabIndex === +index;
      const attrs = {
        role: 'tab',
        tabindex: isFocusable ? '0' : '-1',
        'aria-selected': isSelected ? 'true' : 'false',
      };
      for (const [key, value] of Object.entries(attrs)) {
        setAttribute(tab, key, value);
      }
    }
  };

  private defineHTMLElements = (): void => {
    const { scrollAreaElement, prevGradientElement } = getScrollerElements(this.scrollerElement);
    this.scrollAreaElement = scrollAreaElement;
    this.prevGradientElement = prevGradientElement;
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
    if (!this.scrollAreaElement) {
      return;
    }

    const scrollActivePosition = getScrollActivePosition(
      this.tabElements,
      this.direction,
      this.activeTabIndex,
      this.scrollAreaElement.offsetWidth,
      this.prevGradientElement.offsetWidth
    );

    (this.scrollerElement as HTMLPScrollerElement).scrollToPosition = {
      scrollPosition: scrollActivePosition,
      isSmooth,
    };
  };

  private setBarStyle = (): void => {
    setBarStyle(this.tabElements, this.activeTabIndex, this.barElement, this.prevActiveTabIndex);
  };
  private isSizeBreakpointCustomizable = () => typeof parseJSON(this.size as any) === 'object';
}
