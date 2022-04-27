import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, ThemeExtendedElectric } from '../../../types';
import type { TabChangeEvent, TabGradientColorTheme, TabWeight, TabSize } from './tabs-bar-utils';
import {
  addEnableTransitionClass,
  determineEnableTransitionClass,
  hasPTabsParent,
  getTransformationToActive,
  getTransformationToInactive,
  removeEnableTransitionClass,
  sanitizeActiveTabIndex,
} from './tabs-bar-utils';
import { attachComponentCss, getHTMLElement, getHTMLElements, setAttribute } from '../../../utils';
import { getComponentCss } from './tabs-bar-styles';
import type { ActiveElementChangeEvent } from '../../common/scroller/scroller-utils';

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
  private barElement: HTMLElement;
  private prevActiveTabIndex: number;
  private hasPTabsParent: boolean;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number, oldValue: number): void {
    this.activeTabIndex = sanitizeActiveTabIndex(newValue, this.tabElements.length);
    this.prevActiveTabIndex = oldValue;
  }

  public connectedCallback(): void {
    this.hasPTabsParent = hasPTabsParent(this.host);
    this.setTabElements();
    this.initMutationObserver();
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.activeTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render

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
    this.hostObserver.disconnect();
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    // TODO: scroller prefixable?
    return (
      <p-scroller
        class="scroller"
        theme={this.theme}
        gradientColorScheme={this.gradientColorScheme}
        activeElementIndex={this.activeTabIndex}
        onActiveElementChange={this.onActiveElementChange}
      >
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
  };

  private setTabElements = (): void => {
    this.tabElements = getHTMLElements(this.host, 'a,button');
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

  private onTabClick = (newTabIndex: number): void => {
    this.tabChange.emit({ activeTabIndex: newTabIndex });
  };

  private onActiveElementChange = (e: CustomEvent<ActiveElementChangeEvent>): void => {
    const { activeElementIndex, isEnter } = e.detail;
    if (activeElementIndex !== this.activeTabIndex) {
      if (this.hasPTabsParent && !isEnter) {
        this.onTabClick(activeElementIndex);
      }
      if (isEnter) {
        this.onTabClick(activeElementIndex);
      }
    }
  };
}
