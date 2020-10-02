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
  tag: 'p-tabs-bar',
  styleUrl: 'tabs-bar.scss',
  shadow: true
})
export class TabsBar {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<Extract<TextSize, 'small' | 'medium'>> = 'small';

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
  private tabs: HTMLElement[] = getHTMLElements(this.host, 'a,button');
  private tabsScrollArea: HTMLElement;

  @Watch('activeTabIndex')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  public connectedCallback(): void {
    this.initView();
    this.setActiveTab(this.activeTabIndex);
  }

  public componentDidRender(): void {
    this.updateStatusBarStyle();
  }

  public componentDidLoad(): void {
    setInitialScroll(this.host, { activeTabIndex: this.activeTabIndex, tabSelector: 'a,button' });
    this.initKeyboardEventListener();
    this.initIntersectionObserver();
  }

  public disconnectedCallback(): void {
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsNavClasses = {
      [prefix('tabs-bar')]: true,
      [prefix(`tabs-bar--weight-${this.weight}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('tabs-bar--size', this.size)
    };

    const scrollAreaClasses = {
      [prefix('tabs-bar__scroll-area')]: true
    };

    const statusBarClasses = {
      [prefix('tabs-bar__status-bar')]: true,
      [prefix(`tabs-bar__status-bar--theme-${this.theme}`)]: true,
      [prefix(`tabs-bar__status-bar--weight-${this.weight}`)]: true
    };

    return (
      <div class={tabsNavClasses}>
        <div class={scrollAreaClasses}>
          <slot />
          <span class={statusBarClasses} />
        </div>
        {this.renderPrevNextButton('prev')}
        {this.renderPrevNextButton('next')}
      </div>
    );
  }

  private renderPrevNextButton = (direction: Direction): JSX.Element => {
    const actionClasses = {
      [prefix('tabs-bar__action')]: true,
      [prefix(`tabs-bar__action--theme-${this.theme}`)]: true,
      [prefix(`tabs-bar__action--${direction}`)]: true,
      [prefix('tabs-bar__action--hidden')]: this.actionState[direction === 'prev' ? 'isPrevHidden' : 'isNextHidden']
    };

    const gradientClasses = {
      [prefix('tabs-bar__gradient')]: true,
      [prefix(`tabs-bar__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs-bar__gradient--color-scheme-${this.gradientColorScheme}`)]: true,
      [prefix(`tabs-bar__gradient--${direction}`)]: true
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
    const navList = getHTMLElements(this.host, 'a,button');
    for (const [index, link] of Object.entries(navList)) {
      link.addEventListener('click', () => this.handleTabClick(+index));
    }
  };

  private initKeyboardEventListener = (): void => {
    this.tabsScrollArea = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-bar__scroll-area')}`);
    this.tabsScrollArea.addEventListener('keydown', this.handleKeydown);
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = registerIntersectionObserver((actionState) => {
      this.actionState = {
        ...this.actionState,
        ...actionState
      };
    }, this.tabs);
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.tabs.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    const activeTabClassName = 'selected';
    this.tabs.forEach((tab) => tab.classList.remove(activeTabClassName));
    this.tabs[this.activeTabIndex].classList.add(activeTabClassName);
  };

  private handleTabChange = (activeTabIndex?: number): void => {
    this.setActiveTab(activeTabIndex ?? this.activeTabIndex);
  };

  private handleTabClick = (newTabIndex: number): void => {
    const direction: Direction = newTabIndex > this.activeTabIndex ? 'next' : 'prev';
    this.handleTabChange(newTabIndex);
    scrollOnTabClick(this.host, { newTabIndex, direction, tabSelector: 'a,button' });
  };

  private updateStatusBarStyle = (): void => {
    const statusBar = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs-bar__status-bar')}`);
    statusBar.setAttribute('style', getStatusBarStyle(this.tabs[this.activeTabIndex]));
  };

  private handlePrevNextClick = (direction: Direction): void => {
    scrollOnPrevNextClick(this.host, { direction, tabSelector: 'a,button' });
  };

  private handleKeydown = (e: KeyboardEvent): void => {
    let newTabIndex: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        newTabIndex = this.getPrevNextTabIndex('prev');
        break;

      case 'ArrowRight':
      case 'Right':
        newTabIndex = this.getPrevNextTabIndex('next');
        break;

      case 'Home':
        newTabIndex = 0;
        break;

      case 'End':
        newTabIndex = this.tabs.length - 1;
        break;

      default:
        return;
    }
    e.preventDefault();

    this.handleTabClick(newTabIndex);
    this.tabs[this.activeTabIndex].focus();
  };

  private getPrevNextTabIndex = (direction: Direction): number => {
    const tabsLength = this.tabs.length;
    const newTabIndex = this.activeTabIndex + (direction === 'next' ? 1 : -1);
    return (newTabIndex + tabsLength) % tabsLength;
  };
}
