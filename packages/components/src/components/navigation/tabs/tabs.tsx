import { Component, h, Element, Prop, Watch, State, Host } from '@stencil/core';
import { getPrefixedTagNames, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';
import {
  getStatusBarStyle,
  registerIntersectionObserver,
  scrollOnPrevNext,
  scrollOnTabClick,
  scrollToSelectedTab, setAttributes
} from '../../../utils/tabs-helper';

type HTMLElementSelector = 'nav' | 'statusBar';
type HTMLElementsSelector = 'tabs' | 'gradient';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: 'small' | 'medium' = 'small';

  /** The text weight. */
  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  /** Adapts color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Adapts the background gradient color of prev and next button. */
  @Prop() public colorScheme?: 'default' | 'surface' = 'default';

  @State() public tabsItems: HTMLPTabsItemElement[] = Array.from(this.host.querySelectorAll('p-tabs-item'));
  @State() public activeTabIndex: number = this.tabsItems.findIndex((tab) => tab.selected);
  @State() public isPrevHidden = false;
  @State() public isNextHidden = false;

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
    this.initIntersectionObserver();
    this.setKeyboardEventListener();
    this.initView();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const tabsClasses = {
      [prefix('tabs')]: true,
      [prefix(`tabs--weight-${this.weight}`)]: true,
      ...mapBreakpointPropToPrefixedClasses('tabs--size', this.size)
    };

    const scrollAreaClasses = {
      [prefix('tabs__scroll-area')]: true
    };

    const tabListClasses = {
      [prefix('tabs__tab-list')]: true
    };

    const tabClasses = {
      [prefix('tabs__tab')]: true,
      [prefix(`tabs__tab--theme-${this.theme}`)]: true
    };

    const statusBarClasses = {
      [prefix('tabs__status-bar')]: true,
      [prefix(`tabs__status-bar--theme-${this.theme}`)]: true,
      [prefix(`tabs__status-bar--weight-${this.weight}`)]: true
    };

    const actionClasses = {
      [prefix('tabs__action')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true
    };

    const actionPrevClasses = {
      ...actionClasses,
      [prefix('tabs__action--prev')]: true,
      [prefix('tabs__action--hidden')]: this.isPrevHidden
    };

    const actionNextClasses = {
      ...actionClasses,
      [prefix('tabs__action--next')]: true,
      [prefix('tabs__action--hidden')]: this.isNextHidden
    };

    const gradientClasses = {
      [prefix('tabs__gradient')]: true,
      [prefix(`tabs__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs__gradient--color-scheme-${this.colorScheme}`)]: true
    };

    const gradientClassesPrev = {
      ...gradientClasses,
      [prefix('tabs__gradient--prev')]: true
    };

    const gradientClassesNext = {
      ...gradientClasses,
      [prefix('tabs__gradient--next')]: true
    };

    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-button-pure']);

    return (
      <Host>
        <div class={tabsClasses}>
          <div class={scrollAreaClasses}>
            <ul class={tabListClasses} role="tablist">
              {this.tabsItems.map((tab, index) => {
                const isSelected = this.activeTabIndex === index;

                return (
                  <li role="presentation">
                    <button
                      id={prefix(`tab-item-${index}`)}
                      class={{
                        ...tabClasses,
                        [prefix('tabs__tab--selected')]: isSelected
                      }}
                      type="button"
                      role="tab"
                      tabindex={isSelected ? 0 : -1}
                      aria-selected={isSelected ? 'true' : 'false'}
                      aria-controls={prefix(`tab-panel-${index}`)}
                      onClick={() => this.handleTabClick(index)}
                    >
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
            <span class={statusBarClasses}/>
          </div>
          <div class={actionPrevClasses}>
            <span class={gradientClassesPrev}/>
            <PrefixedTagNames.pButtonPure
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
            <span class={gradientClassesNext}/>
            <PrefixedTagNames.pButtonPure
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
        <slot />
      </Host>
    );
  }

  private initView = (): void => {
    const nav = this.getHTMLElement('nav');
    const tabs = this.getHTMLElements('tabs');
    const gradients = this.getHTMLElements('gradient');
    scrollToSelectedTab(this.activeTabIndex, nav, tabs, gradients);
    this.tabsItems.map((tab, index) => (
      setAttributes(tab, {
        'role': 'tabpanel',
        'hidden': `${!tab.selected}`,
        'id': prefix(`tab-panel-${index}`),
        'aria-labelledby': prefix(`tab-item-${index}`)
      })
    ))
  };

  private observeHost = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({type}) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'selected']
    });
  };

  private initIntersectionObserver = (): void => {
    const tabs = this.getHTMLElements('tabs');
    this.intersectionObserver = registerIntersectionObserver((direction, isIntersecting) => {
      this[direction === 'next' ? 'isNextHidden' : 'isPrevHidden'] = isIntersecting;
    }, tabs);
  };

  private handleTabChange = (activeTabIndex?: number): void => {
    this.resetTabs();
    this.setActiveTab(activeTabIndex ?? this.activeTabIndex);
  };

  private resetTabs = (): void => {
    for (const tab of this.tabsItems) {
      tab.removeAttribute('selected');
    }
  };

  private setActiveTab = (index: number): void => {
    const tabs = this.tabsItems;
    const maxIndex = tabs.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    tabs[this.activeTabIndex].selected = true;
  };

  private setStatusBarStyle = (): void => {
    const statusBar = this.getHTMLElement('statusBar');
    const tabs = this.getHTMLElements('tabs');
    statusBar.setAttribute('style', getStatusBarStyle(this.activeTabIndex, tabs));
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
    const activeTabIndexOnClick = this.activeTabIndex;
    this.handleTabChange(tabIndex);
    const nav = this.getHTMLElement('nav');
    const tabs = this.getHTMLElements('tabs');
    const gradients = this.getHTMLElements('gradient');
    scrollOnTabClick(this.tabsItems, activeTabIndexOnClick, tabIndex, this.activeTabIndex, nav, tabs, gradients);
  };

  private handlePrevNextClick = (action: 'next' | 'prev'): void => {
    const nav = this.getHTMLElement('nav');
    const tabs = this.getHTMLElements('tabs');
    scrollOnPrevNext(action, nav, tabs);
  };

  private updateTabItems = (): void => {
    this.tabsItems = Array.from(this.host.querySelectorAll('p-tabs-item')) as HTMLPTabsItemElement[];
  };

  private getHTMLElement = (element: HTMLElementSelector): HTMLElement => {
    const selector = {
      nav: 'tabs__scroll-area',
      statusBar: 'tabs__status-bar'
    };

    return this.host.shadowRoot.querySelector(`.${prefix(selector[element])}`);
  };

  private getHTMLElements = (elements: HTMLElementsSelector): HTMLElement[] => {
    const selector = {
      tabs: 'tabs__tab',
      gradient: 'tabs__gradient'
    };

    return Array.from(this.host.shadowRoot.querySelectorAll(`.${prefix(selector[elements])}`));
  };
}
