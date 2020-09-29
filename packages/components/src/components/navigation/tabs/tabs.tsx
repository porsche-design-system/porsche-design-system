import { Component, h, Element, Prop, State, Host } from '@stencil/core';
import { getPrefixedTagNames, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';
import {
  ActionState,
  Direction,
  getHTMLElement,
  getHTMLElements,
  getStatusBarStyle,
  registerIntersectionObserver,
  scrollOnPrevNextClick,
  scrollOnTabClick,
  setInitialScroll,
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

  @State() public tabsItems: HTMLPTabsItemElement[] = [];
  @State() public tabs: HTMLElement[] = [];
  @State() public activeTabIndex: number;
  @State() public actionState: ActionState = {
    isPrevHidden: false,
    isNextHidden: false
  };

  private tabsNavElement: HTMLElement;
  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;

  public connectedCallback(): void {
    this.updateTabItems();
    this.activeTabIndex = this.tabsItems.findIndex((tab) => tab.selected);
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
          {this.renderPrevNextButton('prev')}
          {this.renderPrevNextButton('next')}
        </div>
        <slot />
      </Host>
    );
  }

  private renderPrevNextButton = (direction: Direction): JSX.Element => {
    const actionClasses = {
      [prefix('tabs__action')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true,
      [prefix(`tabs__action--${direction}`)]: true,
      [prefix('tabs__action--hidden')]: this.actionState[direction === 'prev' ? 'isPrevHidden' : 'isNextHidden']
    };

    const gradientClasses = {
      [prefix('tabs__gradient')]: true,
      [prefix(`tabs__gradient--theme-${this.theme}`)]: true,
      [prefix(`tabs__gradient--color-scheme-${this.gradientColorScheme}`)]: true,
      [prefix(`tabs__gradient--${direction}`)]: true
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
    const tabSelector = `.${prefix('tabs__tab')}`;
    this.tabs = getHTMLElements(this.host.shadowRoot, tabSelector);
    this.tabsNavElement = getHTMLElement(this.host.shadowRoot, `.${prefix('tabs__scroll-area')}`);
    this.tabsNavElement.addEventListener('keydown', this.handleKeydown);
    setInitialScroll(this.host, { activeTabIndex: this.activeTabIndex, tabSelector, queryInShadowRoot: true });
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
    this.intersectionObserver = registerIntersectionObserver((actionState) => {
      this.actionState = {
        ...this.actionState,
        ...actionState
      };
    }, this.tabs);
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

  private handleTabChange = (newTabIndex: number = this.activeTabIndex): void => {
    this.resetTabs();
    this.setActiveTab(newTabIndex);
    this.tabsItems.forEach(setSectionAttributes);
  };

  private handleTabClick = (newTabIndex: number): void => {
    if (this.activeTabIndex !== newTabIndex) {
      const direction: Direction = newTabIndex > this.activeTabIndex ? 'next' : 'prev';
      this.handleTabChange(newTabIndex);
      scrollOnTabClick(this.host, { newTabIndex, direction, tabSelector: '.p-tabs__tab', queryInShadowRoot: true });
    }
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

  private handlePrevNextClick = (direction: Direction): void => {
    scrollOnPrevNextClick(this.host, { direction, tabSelector: '.p-tabs__tab', queryInShadowRoot: true });
  };

  private updateTabItems = (): void => {
    const PrefixedTagNames = getPrefixedTagNames(this.host, ['p-tabs-item']);
    this.tabsItems = getHTMLElements(this.host, PrefixedTagNames.pTabsItem) as HTMLPTabsItemElement[];
  };

  private getPrevNextTabIndex = (direction: Direction): number => {
    const tabsLength = this.tabs.length;
    const newTabIndex = this.activeTabIndex + (direction === 'next' ? 1 : -1);
    return (newTabIndex + tabsLength) % tabsLength;
  };
}
