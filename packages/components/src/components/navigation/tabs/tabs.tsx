import { Component, h, Element, Prop, Host, Watch, State } from '@stencil/core';
import { prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';

type HTMLElementSelector = 'nav' | 'statusBar';
type HTMLElementsSelector = 'tabs';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: 'small' | 'medium' = 'medium';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Adapts the background color of prev and next buttons */
  @Prop() public colorScheme?: 'default' | 'surface' = 'default';

  // TODO: Focus Styling, - margin
  // TODO: Scroll on Key-Press

  @State() public tabsItems = Array.from(this.host.children) as HTMLPTabsItemElement[];
  @State() public activeTabIndex: number = this.tabsItems.findIndex((tab) => tab.selected);
  @State() public isPrevVisible = false;
  @State() public isNextVisible = false;

  private tabsNavElement: HTMLElement;
  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;

  @Watch('activeTabIndex')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  @Watch('tabsItems')
  public handleTabsItemChange(): void {
    this.handleTabChange();
  }

  public connectedCallback(): void {
    this.handleTabChange(this.activeTabIndex); //We have to reset to ensure
    this.observeHost();
  }

  public componentDidRender = (): void => {
    this.setStatusBarStyle();
  };

  public componentDidLoad(): void {
    this.setKeyboardEventListener();
    this.observeIntersection();
    this.scrollToSelectedTab();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabHeaderClasses = {
      [prefix('tabs__header')]: true
    };

    const tabActionClasses = {
      [prefix('tabs__action')]: true
    };

    const tabPrevClasses = {
      ...tabActionClasses,
      [prefix('tabs__action--prev')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true,
      [prefix(`tabs__action--color-scheme-${this.colorScheme}`)]: true,
      [prefix('tabs__action--visible')]: this.isPrevVisible
    };

    const tabNextClasses = {
      ...tabActionClasses,
      [prefix('tabs__action--next')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true,
      [prefix(`tabs__action--color-scheme-${this.colorScheme}`)]: true,
      [prefix('tabs__action--visible')]: this.isNextVisible
    };

    const tabNavClasses = {
      [prefix('tabs__nav')]: true
    };

    const tabButtonClasses = {
      [prefix('tabs__button')]: true,
      [prefix(`tabs__button--theme-${this.theme}`)]: true,
      [prefix(`tabs__button--size-${this.size}`)]: true,
      [prefix(`tabs__button--weight-${this.weight}`)]: true
    };

    const tabButtonListClasses = {
      [prefix('tabs__button-list')]: true
    };

    const statusBarClasses = {
      [prefix('tabs__status-bar')]: true,
      [prefix(`tabs__status-bar--theme-${this.theme}`)]: true
    };

    return (
      <Host>
        <div class={tabHeaderClasses}>
          <div class={tabNavClasses}>
            <ul class={tabButtonListClasses} role="tablist">
              {this.tabsItems.map((tab, index) => {
                const extendedTabButtonClasses = {
                  ...tabButtonClasses,
                  [prefix('tabs__button--selected')]: tab.selected
                };

                return (
                  <li role="presentation">
                    <button
                      id={prefix(`tab-item-${index}`)}
                      class={extendedTabButtonClasses}
                      type="button"
                      role="tab"
                      tabindex={!tab.selected ? -1 : 0}
                      aria-selected={tab.selected ? 'true' : 'false'}
                      aria-controls={prefix(`tab-panel-${index}`)}
                      onClick={() => this.handleTabClick(index)}
                    >
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <span class={statusBarClasses} />
          </div>
          <div class={tabPrevClasses}>
            <p-button-pure
              theme={this.theme}
              hide-label="true"
              icon="arrow-head-left"
              tabindex={-1}
              onClick={() => this.handlePrevNextClick('prev')}
            >
              Prev
            </p-button-pure>
          </div>
          <div class={tabNextClasses}>
            <p-button-pure
              theme={this.theme}
              hide-label="true"
              icon="arrow-head-right"
              tabindex={-1}
              onClick={() => this.handlePrevNextClick('next')}
            >
              Next
            </p-button-pure>
          </div>
        </div>
        {this.tabsItems.map((tab, index) => (
          <section
            role="tabpanel"
            hidden={!tab.selected}
            innerHTML={tab.outerHTML}
            id={prefix(`tab-panel-${index}`)}
            aria-labelledby={prefix(`tab-item-${index}`)}
          />
        ))}
      </Host>
    );
  }

  private scrollToSelectedTab = (): void => {
    const tabs = this.getHTMLElements('tabs');
    const nav = this.getHTMLElement('nav');
    nav.scrollLeft = tabs[this.activeTabIndex].offsetLeft;
  };

  private resetTabs = (): void => {
    for (const tab of this.tabsItems) {
      tab.selected = false;
    }
  };

  private setKeyboardEventListener = (): void => {
    this.tabsNavElement = this.getHTMLElement('nav');
    this.tabsNavElement.addEventListener('keydown', this.handleKeydown);
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    const tabs = this.getHTMLElements('tabs');
    let newTab: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        newTab = this.prevTab();
        e.preventDefault();
        break;

      case 'ArrowRight':
      case 'Right':
        newTab = this.nextTab();
        e.preventDefault();
        break;

      case 'Home':
        e.preventDefault();
        newTab = 0;
        break;

      case 'End':
        e.preventDefault();
        newTab = this.tabsItems.length - 1;
        break;

      default:
        return;
    }
    this.handleTabClick(newTab);
    tabs[this.activeTabIndex].focus();
  };

  private setActiveTab = (index: number): void => {
    const tabs = this.tabsItems;
    const maxIndex = tabs.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    tabs[this.activeTabIndex].selected = true;
  };

  private handleTabChange = (activeTabIndex?: number): void => {
    this.resetTabs();
    this.setActiveTab(activeTabIndex ?? this.activeTabIndex);
  };

  private nextTab = () => {
    const tabs = this.getHTMLElements('tabs');
    let newTabIndex = this.activeTabIndex + 1;
    return (newTabIndex + tabs.length) % tabs.length;
  };

  private prevTab = () => {
    const tabs = this.getHTMLElements('tabs');
    let newTabIndex = this.activeTabIndex - 1;
    return (newTabIndex + tabs.length) % tabs.length;
  };

  private handleTabClick = (tabIndex: number): void => {
    const activeTabOnClick = this.activeTabIndex;
    this.handleTabChange(tabIndex);

    const nav = this.getHTMLElement('nav');
    const tabs = this.getHTMLElements('tabs');
    const actionButtonWidth = 48;
    const activeTab = tabs[this.activeTabIndex];
    let nextTab: number;

    if (tabIndex > activeTabOnClick && tabIndex < this.tabsItems.length - 1) {
      nextTab = activeTab.offsetLeft - actionButtonWidth;
    } else if (tabIndex < activeTabOnClick && tabIndex > 0) {
      nextTab = activeTab.offsetLeft + activeTab.offsetWidth + actionButtonWidth - nav.offsetWidth;
    } else {
      nextTab = activeTab.offsetLeft;
    }

    nav.scrollTo({
      left: nextTab,
      behavior: 'smooth'
    });
  };

  private updateTabItems = (): void => {
    this.tabsItems = Array.from(this.host.children) as HTMLPTabsItemElement[];
  };

  private observeHost = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'selected']
    });
  };

  private setStatusBarStyle = (): void => {
    const statusBar = this.getHTMLElement('statusBar');
    const tabs = this.getHTMLElements('tabs');
    const activeTab = tabs[this.activeTabIndex];
    const statusBarWidth = activeTab !== undefined ? activeTab.offsetWidth : 0;
    const statusBarPositionLeft = activeTab !== undefined ? activeTab.offsetLeft : 0;
    const statusBarStyle = `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;

    statusBar.setAttribute('style', statusBarStyle);
  };

  private handlePrevNextClick = (action: 'prev' | 'next'): void => {
    const nav = this.getHTMLElement('nav');
    const tabs = this.getHTMLElements('tabs');
    const lastTab = tabs[tabs.length - 1];
    const navWidth = nav.offsetWidth;
    const currentScrollPosition = nav.scrollLeft;
    const scrollToStep = navWidth * 0.2;
    const scrollToMax = lastTab.offsetLeft + lastTab.offsetWidth - navWidth;

    let scrollTo: number;

    if (action === 'next') {
      if (currentScrollPosition + scrollToStep * 2 > scrollToMax) {
        scrollTo = scrollToMax;
      } else {
        scrollTo = currentScrollPosition + scrollToStep;
      }
    } else {
      if (currentScrollPosition - scrollToStep * 2 < 0) {
        scrollTo = 0;
      } else {
        scrollTo = currentScrollPosition - scrollToStep;
      }
    }

    nav.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  private observeIntersection = (): void => {
    const tabs = this.getHTMLElements('tabs');
    const firstTab = tabs[0];
    const lastTab = tabs[tabs.length - 1];

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === firstTab) {
            this.isPrevVisible = !entry.isIntersecting;
          }
          if (entry.target === lastTab) {
            this.isNextVisible = !entry.isIntersecting;
          }
        }
      },
      { threshold: 0.9 }
    );

    this.intersectionObserver.observe(firstTab);
    this.intersectionObserver.observe(lastTab);
  };

  private getHTMLElement = (element: HTMLElementSelector): HTMLElement => {
    const selector = {
      nav: 'tabs__nav',
      statusBar: 'tabs__status-bar'
    };

    return this.host.shadowRoot.querySelector(`.${prefix(selector[element])}`);
  };

  private getHTMLElements = (elements: HTMLElementsSelector): HTMLElement[] => {
    const selector = {
      tabs: 'tabs__button'
    };

    return Array.from(this.host.shadowRoot.querySelectorAll(`.${prefix(selector[elements])}`));
  };
}
