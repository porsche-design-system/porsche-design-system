import { Component, h, Element, Prop, Host, Watch, State } from '@stencil/core';
import { prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';

type HTMLElementSelector = 'nav' | 'statusBar';
type HTMLElementsSelector = 'tabs';

@Component({
  tag: 'p-tabs-nav',
  styleUrl: 'tabs-nav.scss',
  shadow: true
})
export class TabsNav {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: 'small' | 'medium' = 'medium';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Defines which tab to be visualized as selected. */
  @Prop({ reflect: true }) public activeTabIndex?: number = 0;

  @State() public isPrevVisible = false;
  @State() public isNextVisible = false;

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;

  @Watch('activeTabIndex')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  public componentDidRender(): void {
    this.setStatusBarStyle();
  }

  public componentDidLoad(): void {
    this.init();
    // this.observeIntersection();
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
      [prefix('tabs__action--visible')]: this.isPrevVisible
    };

    const tabNextClasses = {
      ...tabActionClasses,
      [prefix('tabs__action--next')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true,
      [prefix('tabs__action--visible')]: this.isNextVisible
    };

    const tabNavClasses = {
      [prefix('tabs__nav')]: true
    };
    //
    // const tabButtonClasses = {
    //   [prefix('tabs__button')]: true,
    //   [prefix(`tabs__button--theme-${this.theme}`)]: true,
    //   [prefix(`tabs__button--size-${this.size}`)]: true,
    //   [prefix(`tabs__button--weight-${this.weight}`)]: true
    // };

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
            <nav class={tabButtonListClasses} role="tablist">
              <slot />
            </nav>
            <span class={statusBarClasses} />
          </div>
          <div class={tabPrevClasses}>
            <p-button-pure
              theme={this.theme}
              hide-label="true"
              icon="arrow-head-left"
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
              onClick={() => this.handlePrevNextClick('next')}
            >
              Next
            </p-button-pure>
          </div>
        </div>
      </Host>
    );
  }

  public init = () => {
    const navList = Array.from(this.host.children);

    const handleTabClick = (e) => {
      for (const [index, link] of Object.entries(navList)) {
        if (link === e.target) {
          this.handleTabChange(+index);
        }
      }

      e.preventDefault();
      e.stopPropagation();
    };

    for (const link of navList) {
      link.addEventListener('click', handleTabClick);
    }
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.host.children.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
  };

  private handleTabChange = (activeTabIndex?: number): void => {
    this.setActiveTab(activeTabIndex ?? this.activeTabIndex);
  };

  // private handleTabClick = (tabIndex: number): void => {
  //   const activeTabOnClick = this.activeTabIndex;
  //   this.handleTabChange(tabIndex);
  //
  //   const tabs = this.getHTMLElements('tabs');
  //   let nextTabIndex = 0;
  //
  //   if (tabIndex > activeTabOnClick && tabIndex < this.tabsItems.length - 1) {
  //     nextTabIndex = this.activeTabIndex + 1;
  //   } else if (tabIndex < activeTabOnClick && tabIndex > 0) {
  //     nextTabIndex = this.activeTabIndex - 1;
  //   } else {
  //     nextTabIndex = tabIndex;
  //   }
  //
  //   const nextTabElement = tabs[nextTabIndex];
  //
  //   nextTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  // };

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
