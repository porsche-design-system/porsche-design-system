import { Component, h, Element, Prop, Watch, State, Host } from '@stencil/core';
import { getPrefixedTagNames, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';
import {
  Direction,
  getHTMLElement,
  getHTMLElements,
  getStatusBarStyle,
  registerIntersectionObserver,
  scrollOnPrevNext,
  scrollOnTabClick,
  scrollToSelectedTab,
  setSectionAttributes
} from '../../../utils/tabs-helper';

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
  @Prop() public gradientColorScheme?: 'default' | 'surface' = 'default';

  @State() public tabsItems: HTMLPTabsItemElement[] = getHTMLElements(
    this.host,
    'p-tabs-item'
  ) as HTMLPTabsItemElement[];
  @State() public tabs: HTMLElement[] = [];
  @State() public activeTabIndex: number = this.tabsItems.findIndex((tab) => tab.selected);
  @State() public actionState: { readonly isPrevHidden: boolean; readonly isNextHidden: boolean } = {
    isPrevHidden: false,
    isNextHidden: false
  };

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
    this.setActiveTab(this.activeTabIndex);
    this.initObserveHost();
  }

  public componentDidRender(): void {
    this.updateStatusBarStyle();
  }

  public componentDidLoad(): void {
    this.initView();
    this.initIntersectionObserver();
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
      [prefix('tabs__action--hidden')]: this.actionState.isPrevHidden
    };

    const actionNextClasses = {
      ...actionClasses,
      [prefix('tabs__action--next')]: true,
      [prefix('tabs__action--hidden')]: this.actionState.isNextHidden
    };

    const gradientClasses = {
      [prefix('tabs__gradient')]: true,
      [prefix(`tabs__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs__gradient--color-scheme-${this.gradientColorScheme}`)]: true
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
            <span class={statusBarClasses} />
          </div>
          <div class={actionPrevClasses}>
            <span class={gradientClassesPrev} />
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
            <span class={gradientClassesNext} />
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
    const tabSelector = `.${prefix('tabs__tab')}`;
    this.tabs = getHTMLElements(this.host.shadowRoot, tabSelector);
    this.tabsNavElement = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs__scroll-area')}`);
    this.tabsNavElement.addEventListener('keydown', this.handleKeydown);
    scrollToSelectedTab(this.host, this.activeTabIndex, tabSelector, true);
  };

  private initObserveHost = (): void => {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label']
    });
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = registerIntersectionObserver((direction, isIntersecting) => {
      this.actionState = {
        ...this.actionState,
        [direction === 'next' ? 'isNextHidden' : 'isPrevHidden']: isIntersecting
      };
    }, this.tabs);
  };

  private handleTabChange = (newTabIndex: number = this.activeTabIndex): void => {
    this.resetTabs();
    this.setActiveTab(newTabIndex);
    this.tabsItems.forEach(setSectionAttributes);
  };

  private resetTabs = (): void => {
    for (const tab of this.tabsItems) {
      tab.removeAttribute('selected');
    }
  };

  private setActiveTab = (index: number): void => {
    const maxIndex = this.tabsItems.length - 1;
    this.activeTabIndex = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    this.tabsItems[this.activeTabIndex].selected = true;
  };

  private updateStatusBarStyle = (): void => {
    const statusBar = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs__status-bar')}`);
    statusBar.setAttribute('style', getStatusBarStyle(this.tabs[this.activeTabIndex]));
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
        newTabIndex = this.tabsItems.length - 1;
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

  private handleTabClick = (newTabIndex: number): void => {
    if (this.activeTabIndex !== newTabIndex) {
      const direction: Direction = newTabIndex > this.activeTabIndex ? 'next' : 'prev';
      this.handleTabChange(newTabIndex);
      scrollOnTabClick(this.host, { newTabIndex, direction, tabSelector: '.p-tabs__tab', queryInShadowRoot: true });
    }
  };

  private handlePrevNextClick = (direction: Direction): void => {
    scrollOnPrevNext(this.host, { direction, tabSelector: '.p-tabs__tab', queryInShadowRoot: true });
  };

  private updateTabItems = (): void => {
    this.tabsItems = getHTMLElements(this.host, 'p-tabs-item') as HTMLPTabsItemElement[];
  };
}
