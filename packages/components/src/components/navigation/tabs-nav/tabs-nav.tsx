import { Component, h, Element, Prop, Watch, State } from '@stencil/core';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { TextSize, TextWeight, Theme } from '../../../types';
import {
  getStatusBarStyle,
  registerIntersectionObserver,
  scrollOnPrevNext, scrollOnTabClick,
  scrollToSelectedTab
} from '../../../utils/tabs-helper';

type HTMLElementSelector = 'nav' | 'statusBar';
type HTMLElementsSelector = 'gradient';

@Component({
  tag: 'p-tabs-nav',
  styleUrl: 'tabs-nav.scss',
  shadow: true
})
export class TabsNav {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<Extract<TextSize, 'small' | 'medium'>> = 'medium';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop({ reflect: true }) public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public colorScheme?: 'default' | 'surface' = 'default';

  /** Defines which tab to be visualized as selected. */
  @Prop() public activeTabIndex?: number = 0;

  @State() public isPrevHidden = false;
  @State() public isNextHidden = false;

  private intersectionObserver: IntersectionObserver;
  private allAnchorTags: HTMLElement[] = Array.from(this.host.querySelectorAll('a'));

  @Watch('activeTabIndex')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  public componentDidRender(): void {
    this.setStatusBarStyle();
  }

  public componentDidLoad(): void {
    this.init();
    this.setActiveTab(this.activeTabIndex ?? 0);
    this.initIntersectionObserver();
    this.initView();
  }

  public disconnectedCallback(): void {
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsNavClasses = {
      [prefix('tabs-nav')]: true,
      [prefix(`tabs-nav--weight-${this.weight}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('tabs-nav--size', this.size)
    };

    const scrollAreaClasses = {
      [prefix('tabs-nav__scroll-area')]: true
    };

    const statusBarClasses = {
      [prefix('tabs-nav__status-bar')]: true,
      [prefix(`tabs-nav__status-bar--theme-${this.theme}`)]: true,
      [prefix(`tabs-nav__status-bar--weight-${this.weight}`)]: true
    };

    const actionClasses = {
      [prefix('tabs-nav__action')]: true,
      [prefix(`tabs-nav__action--theme-${this.theme}`)]: true
    };

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
      [prefix(`tabs-nav__gradient--color-scheme-${this.colorScheme}`)]: true
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
      <div class={tabsNavClasses}>
        <nav class={scrollAreaClasses}>
          <slot />
          <span class={statusBarClasses} />
        </nav>
        <div class={actionPrevClasses}>
          <span class={gradientClassesPrev} />
          <p-button-pure
            aria-hidden="true"
            tabbable={false}
            theme={this.theme}
            hide-label="true"
            size="inherit"
            icon="arrow-head-left"
            onClick={() => this.handlePrevNextClick('prev')}
          />
        </div>
        <div class={actionNextClasses}>
          <span class={gradientClassesNext} />
          <p-button-pure
            aria-hidden="true"
            tabbable={false}
            theme={this.theme}
            hide-label="true"
            size="inherit"
            icon="arrow-head-right"
            onClick={() => this.handlePrevNextClick('next')}
          />
        </div>
      </div>
    );
  }

  public init = () => {
    const navList = Array.from(this.host.querySelectorAll('a')) as HTMLElement[];

    const handleAnchorClick = (e) => {
      for (const [index, link] of Object.entries(navList)) {
        if (link === e.target) {
          this.handleTabClick(+index);
        }
      }
    };

    for (const link of navList) {
      link.addEventListener('click', handleAnchorClick);
    }
  };

  private initView = (): void => {
    const nav = this.getHTMLElement('nav');
    const gradients = this.getHTMLElements('gradient');
    scrollToSelectedTab(this.activeTabIndex, nav, this.allAnchorTags, gradients);
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = registerIntersectionObserver((direction, isIntersecting) => {
      this[direction === 'next' ? 'isNextHidden' : 'isPrevHidden'] = isIntersecting;
    }, this.allAnchorTags);
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.allAnchorTags.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    this.allAnchorTags.forEach((tab) => tab.classList.remove('selected'));
    this.allAnchorTags[this.activeTabIndex].classList.add('selected');
  };

  private handleTabChange = (activeTabIndex?: number): void => {
    this.setActiveTab(activeTabIndex ?? this.activeTabIndex);
  };

  private handleTabClick = (tabIndex: number): void => {
    const activeTabIndexOnClick = this.activeTabIndex;
    this.handleTabChange(tabIndex);
    const nav = this.getHTMLElement('nav');
    const gradients = this.getHTMLElements('gradient');
    scrollOnTabClick(this.allAnchorTags, activeTabIndexOnClick, tabIndex, this.activeTabIndex, nav, this.allAnchorTags, gradients);
  };

  private setStatusBarStyle = (): void => {
    const statusBar = this.getHTMLElement('statusBar');
    statusBar.setAttribute('style', getStatusBarStyle(this.activeTabIndex, this.allAnchorTags));
  };

  private handlePrevNextClick = (action: 'next' | 'prev'): void => {
    const nav = this.getHTMLElement('nav');
    scrollOnPrevNext(action, nav, this.allAnchorTags);
  };

  private getHTMLElement = (element: HTMLElementSelector): HTMLElement => {
    const selector = {
      nav: 'tabs-nav__scroll-area',
      statusBar: 'tabs-nav__status-bar'
    };

    return this.host.shadowRoot.querySelector(`.${prefix(selector[element])}`);
  };

  private getHTMLElements = (elements: HTMLElementsSelector): HTMLElement[] => {
    const selector = {
      gradient: 'tabs-nav__gradient'
    };

    return Array.from(this.host.shadowRoot.querySelectorAll(`.${prefix(selector[elements])}`));
  };
}
