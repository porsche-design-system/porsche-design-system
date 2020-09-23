import { Component, h, Element, Prop, Host, Watch, State } from '@stencil/core';
import { prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';

type HTMLElementSelector = 'nav' | 'statusBar';

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

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public colorScheme?: 'default' | 'surface' = 'default';

  /** Defines which tab to be visualized as selected. */
  @Prop() public activeTabIndex?: number = 0;

  @State() public isPrevHidden = false;
  @State() public isNextHidden = false;

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
    this.setActiveTab(0);
    this.observeIntersection();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsNavClasses = {
      [prefix('tabs-nav')]: true,
      [prefix(`tabs-nav--size-${this.size}`)]: true,
      [prefix(`tabs-nav--weight-${this.weight}`)]: true
    };

    const navClasses = {
      [prefix('tabs-nav__nav')]: true
    };

    const statusBarClasses = {
      [prefix('tabs-nav__status-bar')]: true,
      [prefix(`tabs-nav__status-bar--theme-${this.theme}`)]: true
    };

    const actionClasses = {
      [prefix('tabs-nav__action')]: true,
      [prefix(`tabs-nav__action--theme-${this.theme}`)]: true
    }

    const actionPrevClasses = {
      ...actionClasses,
      [prefix('tabs-nav__action--prev')]: true,
      [prefix('tabs-nav__action--hidden')]: this.isPrevHidden
    };

    const actionNextClasses = {
      ...actionClasses,
      [prefix('tabs-nav__action--next')]: true,
      [prefix('tabs-nav__action--hidden')]: this.isNextHidden
    };

    const gradientClasses = {
      [prefix('tabs-nav__gradient')]: true,
      [prefix(`tabs-nav__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs-nav__gradient--color-scheme-${this.colorScheme}`)]: true,
    };

    const gradientClassesPrev = {
      ...gradientClasses,
      [prefix('tabs-nav__gradient--prev')]: true
    };

    const gradientClassesNext = {
      ...gradientClasses,
      [prefix('tabs-nav__gradient--next')]: true
    };

    return (
      <Host>
        <div class={tabsNavClasses}>
          <nav class={navClasses}>
            <slot/>
            <span class={statusBarClasses}/>
          </nav>
          <div class={actionPrevClasses}>
            <span class={gradientClassesPrev}/>
            <p-button-pure
              tabindex={-1}
              theme={this.theme}
              hide-label="true"
              size="inherit"
              icon="arrow-head-left"
              onClick={() => this.handlePrevNextClick('prev')}
            >
              Prev
            </p-button-pure>
          </div>
          <div class={actionNextClasses}>
            <span class={gradientClassesNext}/>
            <p-button-pure
              tabindex={-1}
              theme={this.theme}
              hide-label="true"
              size="inherit"
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

    const tabs = Array.from(this.host.children) as HTMLElement[];

    tabs.forEach((tab) => tab.classList.remove('selected'));
    tabs[this.activeTabIndex].classList.add('selected');
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
    const tabs = Array.from(this.host.children) as HTMLElement[];
    const activeTab = tabs[this.activeTabIndex];
    const statusBarWidth = activeTab !== undefined ? activeTab.offsetWidth : 0;
    const statusBarPositionLeft = activeTab !== undefined ? activeTab.offsetLeft : 0;
    const statusBarStyle = `width: ${statusBarWidth}px; left: ${statusBarPositionLeft}px`;

    statusBar.setAttribute('style', statusBarStyle);
  };

  private handlePrevNextClick = (action: 'prev' | 'next'): void => {
    const nav = this.getHTMLElement('nav');
    const tabs = Array.from(this.host.children) as HTMLElement[];
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
    const tabs = this.host.children;
    const firstTab = tabs[0];
    const lastTab = tabs[tabs.length - 1];

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === firstTab) {
            this.isPrevHidden = entry.isIntersecting;
          }
          if (entry.target === lastTab) {
            this.isNextHidden = entry.isIntersecting;
          }
        }
      },
      {threshold: 1}
    );

    this.intersectionObserver.observe(firstTab);
    this.intersectionObserver.observe(lastTab);
  };

  private getHTMLElement = (element: HTMLElementSelector): HTMLElement => {
    const selector = {
      nav: 'tabs-nav__nav',
      statusBar: 'tabs-nav__status-bar'
    };

    return this.host.shadowRoot.querySelector(`.${prefix(selector[element])}`);
  };
}
