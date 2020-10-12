import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../utils';
import { TabChangeEvent, TextSize, TextWeight, Theme } from '../../../types';
import { getHTMLElement, getHTMLElements } from '../../../utils/selector-helper';
import { pxToRem } from '@porsche-design-system/utilities';

type Direction = 'prev' | 'next';
type ActionState = {
  readonly isPrevHidden: boolean;
  readonly isNextHidden: boolean;
};
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

  /** Adapts the color when used on dark background. */
  @Prop({ reflect: true }) public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: 'default' | 'surface' = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop() public activeTabIndex?: number = 0;

  /** Emitted when active tab is changed. */
  @Event() public tabChange: EventEmitter<TabChangeEvent>;

  @State() public actionState: ActionState = {
    isPrevHidden: false,
    isNextHidden: false
  };

  private enableTransition = false;
  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;
  private scrollInterval;
  private tabElements: HTMLElement[] = getHTMLElements(this.host, 'a,button');
  private scrollAreaElement: HTMLElement;
  private statusBarElement: HTMLElement;
  private gradientElements: HTMLElement[];

  @Watch('activeTabIndex')
  public activeTabHandler(newTabIndex: number, oldTabIndex: number): void {
    const direction: Direction = newTabIndex > oldTabIndex ? 'next' : 'prev';
    if (this.isActiveTabIndexInvalid(newTabIndex)) {
      this.sanitizeActiveTabIndex(newTabIndex);
      return;
    }
    this.setAccessibilityAttributes();
    this.scrollActiveTabIntoView(direction);
    this.tabChange.emit({ activeTabIndex: this.activeTabIndex });
  }

  public connectedCallback(): void {
    this.sanitizeActiveTabIndex();
    this.setAccessibilityAttributes();
    this.initMutationObserver();
  }

  public componentDidRender(): void {
    this.setStatusBarStyle();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.scrollActiveTabIntoView();
    this.addEventListeners();
    this.initIntersectionObserver();
    this.enableTransitions();
  }

  public disconnectedCallback(): void {
    this.disconnectMutationObserver();
    this.disconnectIntersectionObserver();
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

    const scrollWrapperClasses = {
      [prefix('tabs-bar__scroll-wrapper')]: true
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
          <div class={scrollWrapperClasses}>
            <slot />
            <span class={statusBarClasses} />
          </div>
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

  private isActiveTabIndexInvalid = (newTabIndex: number): boolean => {
    const minIndex = 0;
    const maxIndex = this.tabElements.length - 1;
    return newTabIndex > maxIndex || newTabIndex < minIndex;
  };

  private sanitizeActiveTabIndex = (index: number = this.activeTabIndex): void => {
    const minIndex = 0;
    const maxIndex = this.tabElements.length - 1;

    if (index > maxIndex) {
      this.activeTabIndex = maxIndex;
    } else if (index < minIndex) {
      this.activeTabIndex = 0;
    } else {
      this.activeTabIndex = index;
    }
  };

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of Object.entries(this.tabElements)) {
      const isActiveTab = this.activeTabIndex === +index;
      const attrs = {
        role: 'tab',
        tabindex: isActiveTab ? '0' : '-1',
        'aria-selected': isActiveTab ? 'true' : 'false'
      };
      for (const [key, value] of Object.entries(attrs)) {
        tab.setAttribute(key, value);
      }
    }
  };

  private initMutationObserver = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'characterData')) {
        this.setStatusBarStyle();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true
    });
  };

  private setStatusBarStyle = (): void => {
    this.statusBarElement?.setAttribute('style', this.getStatusBarStyle(this.tabElements[this.activeTabIndex]));
  };

  private getStatusBarStyle = (activeTabElement: HTMLElement): string => {
    const statusBarWidth = activeTabElement ? pxToRem(`${activeTabElement.offsetWidth}px`) : 0;
    const statusBarPositionLeft = activeTabElement && activeTabElement.offsetLeft > 0 ? pxToRem(`${activeTabElement?.offsetLeft}px`) : 0;
    return `transform: translate3d(${statusBarPositionLeft},0,0); width: ${statusBarWidth};`;
  };

  private defineHTMLElements = (): void => {
    this.statusBarElement = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-bar__status-bar')}`);
    this.scrollAreaElement = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-bar__scroll-area')}`);
    this.gradientElements = getHTMLElements(this.host.shadowRoot, `.${prefix('tabs-bar__gradient')}`);
  };

  private addEventListeners = (): void => {
    this.scrollAreaElement.addEventListener('click', (e) => {
      const newTabIndex = this.tabElements.indexOf(e.target as HTMLElement);
      if (newTabIndex >= 0) {
        this.handleTabClick(newTabIndex);
      }
    });
    this.scrollAreaElement.addEventListener('keydown', this.handleKeydown);
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = this.registerIntersectionObserver((actionState) => {
      this.actionState = {
        ...this.actionState,
        ...actionState
      };
    }, this.tabElements);
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
      {
        root: this.host,
        threshold: 0.96
      }
    );

    intersectionObserver.observe(firstTab);
    intersectionObserver.observe(lastTab);

    return intersectionObserver;
  };

  private enableTransitions = (): void => {
    this.enableTransition = true;
  };

  private disconnectIntersectionObserver = (): void => {
    this.intersectionObserver.disconnect();
  };

  private disconnectMutationObserver = (): void => {
    this.hostObserver.disconnect();
  };

  private handleTabClick = (newTabIndex: number): void => {
    this.sanitizeActiveTabIndex(newTabIndex);
  };

  private handlePrevNextClick = (direction: Direction): void => {
    this.scrollOnPrevNextClick(direction);
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    let upcomingFocusedTabIndex: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        upcomingFocusedTabIndex = this.getPrevNextTabIndex('prev');
        break;

      case 'ArrowRight':
      case 'Right':
        upcomingFocusedTabIndex = this.getPrevNextTabIndex('next');
        break;

      case 'Home':
        upcomingFocusedTabIndex = 0;
        break;

      case 'End':
        upcomingFocusedTabIndex = this.tabElements.length - 1;
        break;

      case 'Enter':
        this.handleTabClick(this.getFocusedTabIndex());
        return;

      default:
        return;
    }

    if (this.hasPTabsParent()) {
      this.handleTabClick(upcomingFocusedTabIndex);
      this.tabElements[this.activeTabIndex].focus();
    } else {
      this.tabElements[upcomingFocusedTabIndex].focus();
    }

    e.preventDefault();
  };

  private scrollActiveTabIntoView = (direction: Direction = 'next'): void => {
    const gradientWidths = this.gradientElements.map((item) => item.offsetWidth);
    const activeTabElement = this.tabElements[this.activeTabIndex];

    let scrollPosition: number;

    if (direction === 'next' && this.activeTabIndex < this.tabElements.length - 1) {
      // go to next tab
      scrollPosition = activeTabElement.offsetLeft - gradientWidths[1] + FOCUS_PADDING_WIDTH * 2;
    } else if (direction === 'prev' && this.activeTabIndex > 0) {
      // go to prev tab
      scrollPosition =
        activeTabElement.offsetLeft +
        activeTabElement.offsetWidth +
        gradientWidths[0] -
        this.scrollAreaElement.offsetWidth;
    } else if (this.activeTabIndex === 0) {
      // go to first tab
      scrollPosition = 0;
    } else {
      // go to last tab
      scrollPosition = activeTabElement.offsetLeft - FOCUS_PADDING_WIDTH;
    }
    this.scrollTo(scrollPosition);
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const { offsetLeft: lastTabOffsetLeft, offsetWidth: lastTabOffsetWidth } = this.tabElements[
      this.tabElements.length - 1
    ];
    const { offsetWidth: scrollAreaWidth, scrollLeft: currentScrollPosition } = this.scrollAreaElement;
    const scrollToStep = Math.round(scrollAreaWidth * 0.2);
    const scrollToMin = 0;
    const scrollToMax = lastTabOffsetLeft + lastTabOffsetWidth - scrollAreaWidth + FOCUS_PADDING_WIDTH * 2;

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
      if (currentScrollPosition - scrollToStep * 2 < scrollToMin) {
        scrollPosition = scrollToMin;
      } else {
        scrollPosition = currentScrollPosition - scrollToStep;
      }
    }
    this.scrollTo(scrollPosition);
  };

  private scrollTo = (scrollPosition: number): void => {
    if ('scrollBehavior' in document?.documentElement?.style) {
      this.scrollAreaElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    } else {
      // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
      let i = 0;
      const steps = 20;
      const initialScrollLeft = this.scrollAreaElement.scrollLeft;
      const scrollDistance = scrollPosition - initialScrollLeft;
      const scrollStep = scrollDistance / steps;

      clearInterval(this.scrollInterval);
      this.scrollInterval = setInterval(() => {
        this.scrollAreaElement.scrollLeft = Math.round(initialScrollLeft + i * scrollStep);
        if (++i >= steps) {
          this.scrollAreaElement.scrollLeft = scrollPosition;
          clearInterval(this.scrollInterval);
        }
      }, 10);
    }
  };

  private hasPTabsParent = (): boolean => this.host.parentElement.classList.contains('p-tabs');

  private getFocusedTabIndex = (): number => {
    const indexOfActiveElement = this.tabElements.indexOf(document?.activeElement as HTMLElement);
    return !this.hasPTabsParent() ? (indexOfActiveElement < 0 ? 0 : indexOfActiveElement) : this.activeTabIndex;
  };

  private getPrevNextTabIndex = (direction: Direction): number => {
    const tabsLength = this.tabElements.length;
    const newTabIndex = this.getFocusedTabIndex() + (direction === 'next' ? 1 : -1);

    return (newTabIndex + tabsLength) % tabsLength;
  };
}
