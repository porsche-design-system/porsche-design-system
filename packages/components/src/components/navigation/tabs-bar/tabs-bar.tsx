import { Component, h, Element, Prop, Watch, State, Event, EventEmitter } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../utils';
import { TabChangeEvent, TextSize, TextWeight, Theme } from '../../../types';
import { getHTMLElement, getHTMLElements } from '../../../utils/selector-helper';

type Direction = 'next' | 'prev';
type ActionState = { readonly isPrevHidden: boolean; readonly isNextHidden: boolean };
const FOCUS_PADDING_WIDTH = 4;

@Component({
  tag: 'p-tabs-bar',
  styleUrl: 'tabs-bar.scss',
  shadow: true
})
export class TabsBar {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<Extract<TextSize, 'small' | 'medium'>> = 'small';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop({ reflect: true }) public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: 'default' | 'surface' = 'default';

  /** Defines which tab to be visualized as selected. */
  @Prop() public activeTabIndex?: number = 0;

  /** Emitted when active tab is changing. */
  @Event() public tabChange!: EventEmitter<TabChangeEvent>;

  @State() public actionState: ActionState = {
    isPrevHidden: false,
    isNextHidden: false
  };

  @State() public enableTransition = false;

  private intersectionObserver: IntersectionObserver;
  private tabs: HTMLElement[] = getHTMLElements(this.host, 'a,button');
  private tabsScrollArea: HTMLElement;
  private focusedTabIndex: number;

  @Watch('activeTabIndex')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  public connectedCallback(): void {
    this.setAccessibilityAttributes();
    this.setActiveTab(this.activeTabIndex);
  }

  public componentDidRender(): void {
    this.tabsScrollArea = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-bar__scroll-area')}`);
    this.updateStatusBarStyle();
    this.focusedTabIndex = this.activeTabIndex;
  }

  public componentDidLoad(): void {
    this.setInitialScroll();
    this.tabsScrollArea.addEventListener('click', (e) => {
      const tabIndex = this.tabs.indexOf(e.target as HTMLElement);
      if (tabIndex >= 0) {
        this.handleTabClick(tabIndex);
      }
    });
    this.tabsScrollArea.addEventListener('keydown', this.handleKeydown);
    this.initIntersectionObserver();
    this.enableTransition = true;
  }

  public disconnectedCallback(): void {
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsNavClasses = {
      [prefix('tabs-bar')]: true,
      [prefix(`tabs-bar--weight-${this.weight}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('tabs-bar--size', this.size)
    };

    const scrollAreaClasses = {
      [prefix('tabs-bar__scroll-area')]: true
    };

    const statusBarClasses = {
      [prefix('tabs-bar__status-bar')]: true,
      [prefix('tabs-bar__status-bar--enable-transition')]: this.enableTransition,
      [prefix(`tabs-bar__status-bar--theme-${this.theme}`)]: true,
      [prefix(`tabs-bar__status-bar--weight-${this.weight}`)]: true
    };

    return (
      <div class={tabsNavClasses}>
        <div class={scrollAreaClasses} role="tablist">
          <slot />
          <span class={statusBarClasses} />
        </div>
        {this.renderPrevNextButton('prev')}
        {this.renderPrevNextButton('next')}
      </div>
    );
  }

  private renderPrevNextButton = (direction: Direction): JSX.Element => {
    const actionClasses = {
      [prefix('tabs-bar__action')]: true,
      [prefix(`tabs-bar__action--theme-${this.theme}`)]: true,
      [prefix(`tabs-bar__action--${direction}`)]: true,
      [prefix('tabs-bar__action--hidden')]: this.actionState[direction === 'prev' ? 'isPrevHidden' : 'isNextHidden']
    };

    const gradientClasses = {
      [prefix('tabs-bar__gradient')]: true,
      [prefix(`tabs-bar__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs-bar__gradient--color-scheme-${this.gradientColorScheme}`)]: true,
      [prefix(`tabs-bar__gradient--${direction}`)]: true
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-button-pure']);

    return (
      <div class={actionClasses}>
        <span class={gradientClasses} />
        <PrefixedTagNames.pButtonPure
          aria-hidden="true"
          tabbable={false}
          theme={this.theme}
          hide-label="true"
          size="inherit"
          icon={direction === 'next' ? 'arrow-head-right' : 'arrow-head-left'}
          onClick={() => this.handlePrevNextClick(direction)}
        />
      </div>
    );
  };

  private setInitialScroll = (): void => {
    const gradientWidths = getHTMLElements(this.host.shadowRoot, `.${prefix('tabs-bar__gradient')}`).map(
      (item) => item.offsetWidth
    );
    this.tabsScrollArea.scrollLeft = this.tabs[this.activeTabIndex].offsetLeft - gradientWidths[1];
  };

  private scrollOnTabClick = (direction: Direction, newTabIndex: number): void => {
    const gradientWidths = getHTMLElements(this.host.shadowRoot, `.${prefix('tabs-bar__gradient')}`).map(
      (item) => item.offsetWidth
    );
    const activeTab = this.tabs[newTabIndex];

    let scrollPosition: number;

    // go to next tab
    if (direction === 'next' && newTabIndex < this.host.children.length - 1) {
      scrollPosition = activeTab.offsetLeft - gradientWidths[1];
      // go to prev tab
    } else if (direction === 'prev' && newTabIndex > 0) {
      scrollPosition =
        activeTab.offsetLeft + activeTab.offsetWidth + gradientWidths[0] - this.tabsScrollArea.offsetWidth;
      // go first tab
    } else if (newTabIndex === 0) {
      scrollPosition = 0;
      // go to last tab
    } else {
      scrollPosition = activeTab.offsetLeft - FOCUS_PADDING_WIDTH;
    }
    this.scrollToHorizontal(this.tabsScrollArea, scrollPosition);
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const { offsetLeft: lastTabOffsetLeft, offsetWidth: lastTabOffsetWidth } = this.tabs[this.tabs.length - 1];
    const { offsetWidth: scrollAreaWidth, scrollLeft: currentScrollPosition } = this.tabsScrollArea;
    const scrollToStep = Math.round(scrollAreaWidth * 0.2);
    const scrollToMax = lastTabOffsetLeft + lastTabOffsetWidth - scrollAreaWidth + FOCUS_PADDING_WIDTH;

    let scrollPosition: number;

    if (direction === 'next') {
      // Go to end of scroll-are when close to edge
      if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
        scrollPosition = scrollToMax;
      } else {
        scrollPosition = currentScrollPosition + scrollToStep;
      }
    } else {
      // Go to start of scroll-are when close to edge
      if (currentScrollPosition - scrollToStep * 2 < 0) {
        scrollPosition = 0;
      } else {
        scrollPosition = currentScrollPosition - scrollToStep;
      }
    }
    this.scrollToHorizontal(this.tabsScrollArea, scrollPosition);
  };

  private scrollToHorizontal = (scrollArea: HTMLElement, scrollPosition: number): void => {
    if (navigator.userAgent.includes('Edge/18')) {
      scrollArea.scrollLeft = scrollPosition;
    } else {
      scrollArea.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  private getStatusBarStyle = (activeTab: HTMLElement): string => {
    const statusBarWidth = activeTab?.offsetWidth || 0;
    const statusBarPositionLeft = activeTab?.offsetLeft || 0;
    return `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = this.registerIntersectionObserver((actionState) => {
      this.actionState = {
        ...this.actionState,
        ...actionState
      };
    }, this.tabs);
  };

  private registerIntersectionObserver = (
    cb: (actionState: Partial<ActionState>) => void,
    tabs: HTMLElement[]
  ): IntersectionObserver => {
    const [firstTab] = tabs;
    const [lastTab] = tabs.slice(-1);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === firstTab) {
            cb({ isPrevHidden: entry.isIntersecting });
          } else if (entry.target === lastTab) {
            cb({ isNextHidden: entry.isIntersecting });
          }
        }
      },
      { threshold: 1 }
    );

    intersectionObserver.observe(firstTab);
    intersectionObserver.observe(lastTab);

    return intersectionObserver;
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.tabs.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    this.tabs.forEach((tab) => {
      tab.setAttribute('tabIndex', '-1');
      tab.setAttribute('aria-selected', 'false');
    });
    this.tabs[this.activeTabIndex].setAttribute('tabIndex', '0');
    this.tabs[this.activeTabIndex].setAttribute('aria-selected', 'true');
  };

  private handleTabChange = (newTabIndex: number = this.activeTabIndex): void => {
    if (this.activeTabIndex !== newTabIndex) {
      this.setActiveTab(newTabIndex);
      this.tabChange.emit({ activeTabIndex: newTabIndex });
    }
  };

  private handleTabClick = (newTabIndex: number): void => {
    const direction: Direction = newTabIndex > this.activeTabIndex ? 'next' : 'prev';
    this.handleTabChange(newTabIndex);
    this.scrollOnTabClick(direction, newTabIndex);
  };

  private updateStatusBarStyle = (): void => {
    const statusBar = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-bar__status-bar')}`);
    statusBar.setAttribute('style', this.getStatusBarStyle(this.tabs[this.activeTabIndex]));
  };

  private handlePrevNextClick = (direction: Direction): void => {
    this.scrollOnPrevNextClick(direction);
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    let newTabIndex: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        newTabIndex = this.getPrevNextTabIndex('prev');
        break;

      case 'ArrowRight':
      case 'Right':
        newTabIndex = this.getPrevNextTabIndex('next');
        break;

      case 'Home':
        newTabIndex = 0;
        break;

      case 'End':
        newTabIndex = this.tabs.length - 1;
        break;

      default:
        return;
    }
    e.preventDefault();

    this.tabs[newTabIndex].focus();
  };

  private getPrevNextTabIndex = (direction: Direction): number => {
    const tabsLength = this.tabs.length;
    const newTabIndex = this.focusedTabIndex + (direction === 'next' ? 1 : -1);
    this.focusedTabIndex = newTabIndex;
    return (newTabIndex + tabsLength) % tabsLength;
  };

  private setAccessibilityAttributes = (): void => {
    const navList = getHTMLElements(this.host, 'a,button');
    for (const [index, tab] of Object.entries(navList)) {
      const isSelected = this.activeTabIndex === +index;
      const attrs = {
        role: 'tab',
        tabindex: isSelected ? 0 : -1,
        'aria-selected': isSelected
      };
      // eslint-disable-next-line
      for (const key in attrs) {
        tab.setAttribute(key, attrs[key]);
      }
    }
  };
}
