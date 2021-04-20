import type {
  BreakpointCustomizable,
  TabChangeEvent,
  TabGradientColorTheme,
  TabSize,
  TabWeight,
  Theme,
} from '../../../types';
import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import type { Direction } from './tabs-bar-utils';
import {
  addEnableTransitionClass,
  getScrollActivePosition,
  sanitizeActiveTabIndex,
  determineEnableTransitionClass,
  getScrollPositionAfterPrevNextClick,
  getTransformationToInactive,
  getTransformationToActive,
  removeEnableTransitionClass,
} from './tabs-bar-utils';
import {
  getHTMLElement,
  getHTMLElements,
  getPrefixedTagNames,
  isDark,
  mapBreakpointPropToPrefixedClasses,
  prefix,
  setAttribute,
} from '../../../utils';

@Component({
  tag: 'p-tabs-bar',
  styleUrl: 'tabs-bar.scss',
  shadow: true,
})
export class TabsBar {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabWeight = 'regular';

  /** Adapts the color when used on dark background. */
  @Prop({ reflect: true }) public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public gradientColorScheme?: TabGradientColorTheme = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. */
  @Prop() public activeTabIndex?: number | undefined = undefined;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabChangeEvent>;

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;
  private scrollInterval: NodeJS.Timeout;
  private tabElements: HTMLElement[] = [];
  private scrollAreaElement: HTMLElement;
  private statusBarElement: HTMLElement;
  private firstGradientElement: HTMLElement;
  private direction: Direction = 'next';
  private prevActiveTabIndex: number;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.prevActiveTabIndex = oldValue;
    this.direction = this.activeTabIndex > this.prevActiveTabIndex ? 'next' : 'prev';
    this.scrollActiveTabIntoView();
  }

  public connectedCallback(): void {
    this.setTabElements();
    this.initMutationObserver();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render

    if (!(this.direction === 'next' && this.activeTabIndex === undefined)) {
      // skip scrolling on first render when no activeTabIndex is set
      this.scrollActiveTabIntoView({ skipAnimation: true });
    }
    // setStatusBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    this.setStatusBarStyle();
    this.addEventListeners();
    this.initIntersectionObserver();
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have status bar defined and proper calculation
    this.setStatusBarStyle();
    this.setAccessibilityAttributes();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsNavClasses = {
      [prefix('tabs-bar')]: true,
      [prefix(`tabs-bar--weight-${this.weight}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('tabs-bar--size', this.size),
    };

    const scrollAreaClasses = prefix('tabs-bar__scroll-area');
    const scrollWrapperClasses = prefix('tabs-bar__scroll-wrapper');
    const scrollWrapperTriggerClasses = prefix('tabs-bar__scroll-wrapper__trigger');

    const statusBarClasses = {
      [prefix('tabs-bar__status-bar')]: true,
      [prefix('tabs-bar__status-bar--theme-dark')]: isDark(this.theme),
      [prefix(`tabs-bar__status-bar--weight-${this.weight}`)]: true,
    };

    return (
      <div class={tabsNavClasses}>
        <div class={scrollAreaClasses} role="tablist">
          <div class={scrollWrapperClasses}>
            <slot />
            <span class={statusBarClasses} />
            <div class={scrollWrapperTriggerClasses} />
            <div class={scrollWrapperTriggerClasses} />
          </div>
        </div>
        {this.renderPrevNextButton('prev')}
        {this.renderPrevNextButton('next')}
      </div>
    );
  }

  private renderPrevNextButton = (direction: Direction): JSX.Element => {
    const isDarkTheme = isDark(this.theme);
    const actionClasses = {
      [prefix('tabs-bar__action')]: true,
      [prefix('tabs-bar__action--theme-dark')]: isDarkTheme,
      [prefix(`tabs-bar__action--${direction}`)]: true,
      [prefix('tabs-bar__action--hidden')]: direction === 'prev' ? this.isPrevHidden : this.isNextHidden,
    };

    const gradientClasses = {
      [prefix('tabs-bar__gradient')]: true,
      [prefix('tabs-bar__gradient--theme-dark')]: isDarkTheme,
      [prefix(`tabs-bar__gradient--color-scheme-${this.gradientColorScheme}`)]: true,
      [prefix(`tabs-bar__gradient--${direction}`)]: true,
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host);

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
          onClick={() => this.scrollOnPrevNextClick(direction)}
        >
          {direction}
        </PrefixedTagNames.pButtonPure>
      </div>
    );
  };

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
        tab.setAttribute(key, value);
      }
    }
  };

  private setStatusBarStyle = (): void => {
    // statusBarElement is undefined on first render
    if (!this.statusBarElement) {
      return;
    }
    if (this.activeTabIndex === undefined && this.prevActiveTabIndex !== undefined) {
      // handle initial inactive + active to inactive cases
      addEnableTransitionClass(this.statusBarElement);
      const transformationToInactive = getTransformationToInactive(this.tabElements[this.prevActiveTabIndex]);
      setAttribute(this.statusBarElement, 'style', transformationToInactive);
    } else if (this.activeTabIndex === undefined && this.prevActiveTabIndex === undefined) {
      // handle active to removed
      removeEnableTransitionClass(this.statusBarElement);
      const transformationToInactive = getTransformationToInactive();
      setAttribute(this.statusBarElement, 'style', transformationToInactive);
    } else {
      // handle initial active + active to active + inactive to active cases
      determineEnableTransitionClass(this.activeTabIndex, this.prevActiveTabIndex, this.statusBarElement);
      const transformationToActive = getTransformationToActive(this.tabElements[this.activeTabIndex]);
      setAttribute(this.statusBarElement, 'style', transformationToActive);
    }
  };

  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.statusBarElement = getHTMLElement(shadowRoot, `.${prefix('tabs-bar__status-bar')}`);
    this.scrollAreaElement = getHTMLElement(shadowRoot, `.${prefix('tabs-bar__scroll-area')}`);
    this.firstGradientElement = getHTMLElement(shadowRoot, `.${prefix('tabs-bar__gradient:first-child')}`);
  };

  private setTabElements = (): void => {
    this.tabElements = getHTMLElements(this.host, 'a,button');
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

  private initMutationObserver = (): void => {
    this.hostObserver = new MutationObserver((): void => {
      this.setTabElements();
      this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      this.setStatusBarStyle();
      this.setAccessibilityAttributes();
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };

  private initIntersectionObserver = (): void => {
    const [firstTrigger, lastTrigger] = getHTMLElements(
      this.host.shadowRoot,
      `.${prefix('tabs-bar__scroll-wrapper__trigger')}`
    );

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === firstTrigger) {
            this.isPrevHidden = isIntersecting;
          } else if (target === lastTrigger) {
            this.isNextHidden = isIntersecting;
          }
        }
      },
      {
        root: this.host,
        // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
        // In his case 0.9px of the trigger have to be hidden to show the gradient
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(firstTrigger);
    this.intersectionObserver.observe(lastTrigger);
  };

  private handleTabClick = (newTabIndex: number): void => {
    this.tabChange.emit({ activeTabIndex: newTabIndex });
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
        this.handleTabClick(this.focusedTabIndex);
        return;

      default:
        return;
    }

    if (this.hasPTabsParent) {
      this.handleTabClick(upcomingFocusedTabIndex);
    }
    this.tabElements[upcomingFocusedTabIndex].focus();

    e.preventDefault();
  };

  private scrollActiveTabIntoView = (opts?: { skipAnimation: boolean }): void => {
    const scrollActivePosition = getScrollActivePosition(
      this.tabElements,
      this.direction,
      this.activeTabIndex,
      this.scrollAreaElement.offsetWidth,
      this.firstGradientElement.offsetWidth
    );

    if (opts?.skipAnimation) {
      this.scrollAreaElement.scrollLeft = scrollActivePosition;
    } else {
      this.scrollTo(scrollActivePosition);
    }
  };

  private scrollOnPrevNextClick = (direction: Direction): void => {
    const scrollPosition = getScrollPositionAfterPrevNextClick(this.tabElements, this.scrollAreaElement, direction);
    this.scrollTo(scrollPosition);
  };

  private scrollTo = (scrollPosition: number): void => {
    if ('scrollBehavior' in document?.documentElement?.style) {
      this.scrollAreaElement.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
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

  private get hasPTabsParent(): boolean {
    return this.host.parentElement.classList.contains('p-tabs');
  }

  private get focusedTabIndex(): number {
    const indexOfActiveElement = this.tabElements.indexOf(document?.activeElement as HTMLElement);
    if (this.hasPTabsParent) {
      return this.activeTabIndex ?? 0;
    } else {
      return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
    }
  }

  private getPrevNextTabIndex = (direction: Direction): number => {
    const tabsLength = this.tabElements.length;
    const newTabIndex = this.focusedTabIndex + (direction === 'next' ? 1 : -1);

    return (newTabIndex + tabsLength) % tabsLength;
  };
}
