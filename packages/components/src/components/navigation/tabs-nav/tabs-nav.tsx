import { Component, h, Element, Prop, Watch, State } from '@stencil/core';
import {
  BreakpointCustomizable,
  getPrefixedTagNames,
  mapBreakpointPropToPrefixedClasses,
  prefix
} from '../../../utils';
import { TextSize, TextWeight, Theme } from '../../../types';
import {
  ActionState,
  Direction,
  getHTMLElement,
  getHTMLElements,
  getStatusBarStyle,
  registerIntersectionObserver,
  scrollOnPrevNextClick,
  scrollOnTabClick,
  setInitialScroll
} from '../../../utils/tabs-helper';

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
  @Prop() public gradientColorScheme?: 'default' | 'surface' = 'default';

  /** Defines which tab to be visualized as selected. */
  @Prop() public activeTabIndex?: number = 0;

  @State() public actionState: ActionState = {
    isPrevHidden: false,
    isNextHidden: false
  };

  private intersectionObserver: IntersectionObserver;
  private allAnchorTags: HTMLElement[] = getHTMLElements(this.host, 'a');

  @Watch('activeTabIndex')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  public componentDidRender(): void {
    this.updateStatusBarStyle();
  }

  public componentDidLoad(): void {
    this.initView();
    this.setActiveTab(this.activeTabIndex);
    this.initIntersectionObserver();
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

    return (
      <div class={tabsNavClasses}>
        <nav class={scrollAreaClasses}>
          <slot />
          <span class={statusBarClasses} />
        </nav>
        {this.renderPrevNextButton('prev')}
        {this.renderPrevNextButton('next')}
      </div>
    );
  }

  private renderPrevNextButton = (direction: Direction): JSX.Element => {
    const actionClasses = {
      [prefix('tabs-nav__action')]: true,
      [prefix(`tabs-nav__action--theme-${this.theme}`)]: true,
      [prefix(`tabs-nav__action--${direction}`)]: true,
      [prefix('tabs-nav__action--hidden')]: this.actionState[direction === 'prev' ? 'isPrevHidden' : 'isNextHidden']
    };

    const gradientClasses = {
      [prefix('tabs-nav__gradient')]: true,
      [prefix(`tabs-nav__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs-nav__gradient--color-scheme-${this.gradientColorScheme}`)]: true,
      [prefix(`tabs-nav__gradient--${direction}`)]: true
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

  private initView = (): void => {
    const navList = getHTMLElements(this.host, 'a');
    for (const [index, link] of Object.entries(navList)) {
      link.addEventListener('click', () => this.handleTabClick(+index));
    }
    setInitialScroll(this.host, { activeTabIndex: this.activeTabIndex, tabSelector: 'a' });
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = registerIntersectionObserver((actionState) => {
      this.actionState = {
        ...this.actionState,
        ...actionState
      };
    }, this.allAnchorTags);
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.allAnchorTags.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    const activeTabClassName = 'selected';
    this.allAnchorTags.forEach((tab) => tab.classList.remove(activeTabClassName));
    this.allAnchorTags[this.activeTabIndex].classList.add(activeTabClassName);
  };

  private handleTabChange = (activeTabIndex?: number): void => {
    this.setActiveTab(activeTabIndex ?? this.activeTabIndex);
  };

  private handleTabClick = (newTabIndex: number): void => {
    const direction: Direction = newTabIndex > this.activeTabIndex ? 'next' : 'prev';
    this.handleTabChange(newTabIndex);
    scrollOnTabClick(this.host, { newTabIndex, direction, tabSelector: 'a' });
  };

  private updateStatusBarStyle = (): void => {
    const statusBar = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-nav__status-bar')}`);
    statusBar.setAttribute('style', getStatusBarStyle(this.allAnchorTags[this.activeTabIndex]));
  };

  private handlePrevNextClick = (direction: Direction): void => {
    scrollOnPrevNextClick(this.host, { direction, tabSelector: 'a' });
  };
}
