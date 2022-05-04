import type { EventEmitter } from '@stencil/core';
import { Component, Element, Event, Prop, State, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import type { TabChangeEvent, TabSize, TabWeight } from './tabs-bar-utils';
import { getFocusedTabIndex, getPrevNextTabIndex, sanitizeActiveTabIndex, setBarStyle } from './tabs-bar-utils';
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
import type { ActiveElementChange, GradientColorTheme } from '../../common/scroller/scroller-utils';

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
  private barElement: HTMLElement;
  private prevActiveTabIndex: number;
  private hasPTabsParent: boolean;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.prevActiveTabIndex = oldValue;
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isParentOfKind(this.host, 'pTabs', true);
    this.setTabElements();
    observeChildren(this.host, () => {
      this.setTabElements();
      this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length);
      this.prevActiveTabIndex = this.activeTabIndex;
      setBarStyle(this.tabElements, this.activeTabIndex, this.barElement, this.prevActiveTabIndex);
      this.setAccessibilityAttributes();
    });
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render
    // TODO: should be on a different element
    this.host.addEventListener('keydown', this.onKeydown);

    // setBarStyle() is needed when intersection observer does not trigger because all tabs are visible
    // and first call in componentDidRender() is skipped because elements are not defined, yet
    setBarStyle(this.tabElements, this.activeTabIndex, this.barElement, this.prevActiveTabIndex);
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.theme);
  }

  public componentDidRender(): void {
    // needs to happen after render in order to have status bar defined and proper calculation
    setBarStyle(this.tabElements, this.activeTabIndex, this.barElement, this.prevActiveTabIndex);
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
        onActiveElementChange={({ detail: { activeElementIndex } }: CustomEvent<ActiveElementChange>) =>
          this.onTabClick(activeElementIndex)
        }
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

  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.barElement = getHTMLElement(shadowRoot, '.bar');
  };

  private setTabElements = (): void => {
    const elements: HTMLElement[] = getHTMLElements(this.host, 'a,button');
    if (this.tabElements.length !== elements.length) {
      this.tabElements = elements;
    }
  };

  private onTabClick = (newTabIndex: number): void => {
    this.tabChange.emit({ activeTabIndex: newTabIndex });
  };

  private onKeydown = (e: KeyboardEvent): void => {
    let upcomingFocusedTabIndex: number;
    const focusedTabIndex = this.hasPTabsParent ? this.activeTabIndex : getFocusedTabIndex(this.tabElements);

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
}
