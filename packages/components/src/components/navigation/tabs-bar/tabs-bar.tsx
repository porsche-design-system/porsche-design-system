import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import type { TabChangeEvent, TabWeight, TabSize } from './tabs-bar-utils';
import {
  addEnableTransitionClass,
  determineEnableTransitionClass,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
} from './tabs-bar-utils';
import {
  attachComponentCss,
  getHTMLElement,
  getHTMLElements,
  getPrefixedTagNames,
  isParentOfKind,
  observeChildren,
  setAttribute,
  unobserveChildren,
} from '../../../utils';
import { getComponentCss } from './tabs-bar-styles';
import { Direction, GradientColorTheme } from '../../common/scroller/scroller-utils';

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
  @Prop() public gradientColorScheme?: GradientColorTheme = 'default';

  /** Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. */
  @Prop() public activeTabIndex?: number | undefined;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public tabChange: EventEmitter<TabChangeEvent>;

  @State() private tabElements: HTMLElement[] = [];

  private intersectionObserver: IntersectionObserver;
  private scroller: HTMLElement;
  private scrollAreaElement: HTMLElement;
  private barElement: HTMLElement;
  private prevActiveTabIndex: number;
  private hasPTabsParent: boolean;

  // TODO: extract and unit test!
  private get focusedTabIndex(): number {
    if (this.hasPTabsParent) {
      return this.activeTabIndex;
    }
    const indexOfActiveElement = this.tabElements.indexOf(document?.activeElement as HTMLElement);
    return indexOfActiveElement < 0 ? 0 : indexOfActiveElement;
  }

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.prevActiveTabIndex = oldValue;
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isParentOfKind(this.host, 'pTabs', true);
    this.setTabElements();
    this.initMutationObserver();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render
    this.scrollAreaElement.addEventListener('keydown', this.onKeydown);

    // setBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    this.setBarStyle();
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
    unobserveChildren(this.host);
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pScroller
        class="scroller"
        theme={this.theme}
        gradientColorScheme={this.gradientColorScheme}
        activeElementIndex={this.activeTabIndex}
        slottedElements={this.tabElements}
        onActiveElementChange={({ detail: { activeElementIndex } }) => this.onTabClick(activeElementIndex)}
        ref={(el) => (this.scroller = el)}
      >
        <slot />
        <span class="bar" />
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
    this.scrollAreaElement = getHTMLElement(this.scroller.shadowRoot, '.scroll-area');
    this.barElement = getHTMLElement(shadowRoot, '.bar');
  };

  private setTabElements = (): void => {
    const elements: HTMLElement[] = getHTMLElements(this.host, 'a,button');
    if (this.tabElements.length !== elements.length) {
      this.tabElements = elements;
    }
  };

  private initMutationObserver = (): void => {
    observeChildren(this.host, () => {
      this.setTabElements();
      this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      this.setBarStyle();
      this.setAccessibilityAttributes();
    });
  };

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

  // TODO: should be pure function and unit tested
  private getPrevNextTabIndex = (direction: Direction): number => {
    const slottedElementsLength = this.tabElements.length;
    const newTabIndex = this.focusedTabIndex + (direction === 'next' ? 1 : -1);

    return (newTabIndex + slottedElementsLength) % slottedElementsLength;
  };
}
