import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import type { TabChangeEvent, TabGradientColorTheme, TabWeight, TabSize } from './tabs-bar-utils';
import type { Direction } from '../../common/scroller/scroller-utils';
import {
  addEnableTransitionClass,
  determineEnableTransitionClass,
  hasPTabsParent,
  getScrollActivePosition,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
} from './tabs-bar-utils';
import { attachComponentCss, getHTMLElement, getHTMLElements, scrollElementTo, setAttribute } from '../../../utils';
import { getComponentCss } from './tabs-bar-styles';

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

  @State() public isPrevHidden = true;
  @State() public isNextHidden = true;

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;
  private tabElements: HTMLElement[] = [];
  private scrollAreaElement: HTMLElement;
  private barElement: HTMLElement;
  private prevGradientElement: HTMLElement;
  private direction: Direction = 'next';
  private prevActiveTabIndex: number;
  private hasPTabsParent: boolean;

  private get focusedTabIndex(): number {
    if (this.hasPTabsParent) {
      return this.activeTabIndex ?? 0;
    } else {
      const indexOfActiveElement = this.tabElements.indexOf(document?.activeElement as HTMLElement);
      return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
    }
  }

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.prevActiveTabIndex = oldValue;
    this.direction = this.activeTabIndex > this.prevActiveTabIndex ? 'next' : 'prev';
    this.scrollActiveTabIntoView();
  }

  public connectedCallback(): void {
    this.hasPTabsParent = hasPTabsParent(this.host);
    this.setTabElements();
    this.initMutationObserver();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render

    if (!(this.direction === 'next' && this.activeTabIndex === undefined)) {
      // skip scrolling on first render when no activeTabIndex is set
      this.scrollActiveTabIntoView(true);
    }

    // setStatusBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    this.setBarStyle();
    this.addEventListeners();
    // initHorizontalScrollingIntersectionObserver(
    //   this.host,
    //   this.intersectionObserver,
    //   (isIntersecting) => {
    //     this.isPrevHidden = isIntersecting;
    //   },
    //   (isIntersecting) => {
    //     this.isNextHidden = isIntersecting;
    //   }
    // );
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.theme);
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have status bar defined and proper calculation
    this.setBarStyle();
    this.setAccessibilityAttributes();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    return (
      <p-scroller class="scroller" theme={this.theme} gradientColorScheme={this.gradientColorScheme}>
        <slot />
        <span class="bar" />
      </p-scroller>
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

  private setBarStyle = (): void => {
    // TODO: move entire function into utilities and refactor to single setAttribute call
    // statusBarElement is undefined on first render
    const { activeTabIndex, barElement, prevActiveTabIndex } = this;
    if (!barElement) {
      return;
    }

    if (activeTabIndex === undefined && prevActiveTabIndex !== undefined) {
      // handle initial inactive + active to inactive cases
      addEnableTransitionClass(barElement);
      const transformationToInactive = getTransformationToInactive(this.tabElements[prevActiveTabIndex]);
      setAttribute(barElement, 'style', transformationToInactive);
    } else if (activeTabIndex === undefined && prevActiveTabIndex === undefined) {
      // handle active to removed
      removeEnableTransitionClass(barElement);
      const transformationToInactive = getTransformationToInactive();
      setAttribute(barElement, 'style', transformationToInactive);
    } else {
      // handle initial active + active to active + inactive to active cases
      determineEnableTransitionClass(activeTabIndex, prevActiveTabIndex, barElement);
      const transformationToActive = getTransformationToActive(this.tabElements[activeTabIndex]);
      setAttribute(barElement, 'style', transformationToActive);
    }
  };

  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.barElement = getHTMLElement(shadowRoot, '.bar');
    this.scrollAreaElement = getHTMLElement(shadowRoot.querySelector('p-scroller').shadowRoot, '.scroll-area');
    this.prevGradientElement = getHTMLElement(shadowRoot.querySelector('p-scroller').shadowRoot, '.gradient');
  };

  private setTabElements = (): void => {
    this.tabElements = getHTMLElements(this.host, 'a,button');
  };

  private addEventListeners = (): void => {
    this.scrollAreaElement?.addEventListener('click', (e) => {
      const newTabIndex = this.tabElements.indexOf(e.target as HTMLElement);
      if (newTabIndex >= 0) {
        this.onTabClick(newTabIndex);
      }
    });
    this.scrollAreaElement?.addEventListener('keydown', this.onKeydown);
  };

  private initMutationObserver = (): void => {
    this.hostObserver = new MutationObserver((): void => {
      this.setTabElements();
      this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      this.setBarStyle();
      this.setAccessibilityAttributes();
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  };

  // private initIntersectionObserver = (): void => {
  //   const [firstTrigger, lastTrigger] = getHTMLElements(this.host.shadowRoot, '.trigger');
  //
  //   this.intersectionObserver = new IntersectionObserver(
  //     (entries) => {
  //       for (const { target, isIntersecting } of entries) {
  //         if (target === firstTrigger) {
  //           this.isPrevHidden = isIntersecting;
  //         } else if (target === lastTrigger) {
  //           this.isNextHidden = isIntersecting;
  //         }
  //       }
  //     },
  //     {
  //       // TODO: shouldn't root be the the scrollable div rather than the host?
  //       root: this.host,
  //       // Defines the percentage of how much of the target (trigger) is visible within the element specified (this.host).
  //       // In his case 0.9px of the trigger have to be hidden to show the gradient
  //       threshold: 0.1,
  //     }
  //   );
  //
  //   this.intersectionObserver.observe(firstTrigger);
  //   this.intersectionObserver.observe(lastTrigger);
  // };

  private onTabClick = (newTabIndex: number): void => {
    this.tabChange.emit({ activeTabIndex: newTabIndex });
  };

  private onKeydown = (e: KeyboardEvent): void => {
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
        this.onTabClick(this.focusedTabIndex);
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

  private scrollActiveTabIntoView = (skipAnimation?: boolean): void => {
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

    if (skipAnimation) {
      this.scrollAreaElement.scrollLeft = scrollActivePosition;
    } else {
      scrollElementTo(this.scrollAreaElement, scrollActivePosition);
    }
  };

  // private scrollOnPrevNextClick = (direction: Direction): void => {
  //   const scrollPosition = getScrollPositionAfterPrevNextClick(this.tabElements, this.scrollAreaElement, direction);
  //   scrollElementTo(this.scrollAreaElement, scrollPosition);
  // };

  private getPrevNextTabIndex = (direction: Direction): number => {
    const tabsLength = this.tabElements.length;
    const newTabIndex = this.focusedTabIndex + (direction === 'next' ? 1 : -1);

    return (newTabIndex + tabsLength) % tabsLength;
  };
}
