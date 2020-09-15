import { Component, h, Element, Prop, Host, Watch, State } from '@stencil/core';
import { isTouchDevice, prefix } from '../../../utils';
import { TextWeight, Theme } from '../../../types';

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

  @State() public tabsItems: HTMLPTabsItemElement[] = Array.from(this.host.querySelectorAll('p-tabs-item'));

  /** Defines the tab to be activated (index: zero-based). */
  @Prop({reflect: true}) public activeTab?: number = this.tabsItems.findIndex((tab) => tab.selected);

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;

  @Watch('activeTab')
  public activeTabHandler(activeTab: number): void {
    this.handleTabChange(activeTab);
  }

  @Watch('tabsItems')
  public handleTabsItemChange(): void {
    this.handleTabChange();
  }

  public connectedCallback(): void {
    this.updateTabItems();
    this.handleTabChange();
    this.observeHost();
  }

  public componentDidLoad(): void {
    this.setSliderPosition(this.activeTab);
    this.observeIntersection();
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
      [prefix(`tabs__action--theme-${this.theme}`)]: true
    };

    const tabNextClasses = {
      ...tabActionClasses,
      [prefix('tabs__action--next')]: true,
      [prefix(`tabs__action--theme-${this.theme}`)]: true
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
      [prefix('tabs__button-list')]: true,
    };

    const sliderClasses = {
      [prefix('tabs__slider')]: true,
      [prefix(`tabs__slider--theme-${this.theme}`)]: true
    };

    return (
      <Host>
        <div class={tabHeaderClasses}>
          <nav class={tabNavClasses}>
            <ul class={tabButtonListClasses}>
              {this.tabsItems.map((tab, index) => {
                const extendedTabButtonClasses = {
                  ...tabButtonClasses,
                  [prefix('tabs__button--selected')]: tab.selected
                };

                const Tag = tab.href === undefined ? 'button' : 'a';
                const props = (({href, target}) => ({href, target}))(tab);

                return (
                  <li>
                    <Tag
                      class={extendedTabButtonClasses}
                      role="tab"
                      {...props}
                      onClick={() => this.handleTabButtonClick(index)}
                    >
                      {tab.label}
                    </Tag>
                  </li>
                );
              })}
            </ul>
            <span class={sliderClasses}/>
          </nav>
          <div class={tabPrevClasses}>
            <p-button-pure
              theme={this.theme}
              hide-label="true"
              icon="arrow-head-left"
              onClick={() => this.handleArrowClick('left')}
            >
              Prev
            </p-button-pure>
          </div>
          <div class={tabNextClasses}>
            <p-button-pure
              theme={this.theme}
              hide-label="true"
              icon="arrow-head-right"
              onClick={() => this.handleArrowClick('right')}
            >
              Next
            </p-button-pure>
          </div>
        </div>
        <slot/>
      </Host>
    );
  }

  private resetTabs = (): void => {
    this.tabsItems.forEach((tab) => (tab.selected = false));
  };

  private setActiveTab = (index: number): void => {
    const allTabElements = this.tabsItems;
    const maxIndex = allTabElements.length - 1;
    this.activeTab = maxIndex < index ? maxIndex : index < 0 ? 0 : index;
    allTabElements[this.activeTab].selected = true;
  };

  private handleTabChange = (newActiveTab?: number): void => {
    this.resetTabs();
    this.setSliderPosition(newActiveTab ?? this.activeTab);
    this.setActiveTab(newActiveTab ?? this.activeTab);
  };

  private setSliderPosition = (newActiveTab: number): void => {
    const slider = this.getHTMLElement('slider');
    const allTabs = this.getHTMLElements('tabs');
    if (allTabs.length === 0) {
      return;
    }
    const newActiveButton = allTabs[newActiveTab] as HTMLElement;
    const sliderWidth = newActiveButton.offsetWidth;
    const newSliderPosition = newActiveButton.offsetLeft;

    slider.setAttribute('style', `width: ${sliderWidth}px; left:${newSliderPosition}px`);
  };

  private handleTabButtonClick = (tabIndex: number): void => {
    const activeTabOnClick = this.activeTab;
    this.handleTabChange(tabIndex);

    const allTabs = this.getHTMLElements('tabs');
    let nextTabIndex = 0;

    if (tabIndex > activeTabOnClick && tabIndex < this.tabsItems.length - 1) {
      nextTabIndex = this.activeTab + 1;
    } else if (tabIndex < activeTabOnClick && tabIndex > 0) {
      nextTabIndex = this.activeTab - 1;
    } else nextTabIndex = tabIndex;

    const nextTabElement = allTabs[nextTabIndex] as HTMLElement;

    nextTabElement.scrollIntoView({behavior: 'smooth', inline: 'center'});
  };

  private handleArrowClick = (direction: string): void => {
    const nav = this.getHTMLElement('nav');
    const tabs = this.getHTMLElements('tabs');
    const lastTab = tabs[tabs.length - 1] as HTMLElement;
    const navWidth = nav.offsetWidth;
    const scrollPercentage = 20;
    const scrollWidth = (navWidth / 100) * scrollPercentage;
    const scrollPosition = nav.scrollLeft;
    const maxScrollTo = lastTab.offsetLeft + lastTab.offsetWidth - navWidth;
    let scrollTo = direction === 'right' ? scrollPosition + scrollWidth : scrollPosition - scrollWidth;
    if (scrollTo + scrollWidth > maxScrollTo) {
      scrollTo = maxScrollTo;
    } else if (scrollTo - scrollWidth < 0) {
      scrollTo = 0;
    }

    nav.scrollTo({
      left: scrollTo,
      behavior: 'smooth'
    });
  };

  private updateTabItems = (): void => {
    this.tabsItems = Array.from(this.host.querySelectorAll('p-tabs-item'));
  };

  private observeHost(): void {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({type}) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'href', 'target']
    });
  }

  private observeIntersection(): void {
    if (isTouchDevice()) {
      return;
    }

    const prev = this.getHTMLElement('prev');
    const next = this.getHTMLElement('next');
    const tabs = this.getHTMLElements('tabs');
    const firstTab = tabs[0] as HTMLElement;
    const lastTab = tabs[tabs.length - 1] as HTMLElement;
    const actionVisibilityCSSClass = prefix('tabs__action--visible');

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === firstTab && entry.isIntersecting) {
            prev.classList.remove(actionVisibilityCSSClass);
          } else if (entry.target === firstTab && !entry.isIntersecting) {
            prev.classList.add(actionVisibilityCSSClass);
          } else if (entry.target === lastTab && entry.isIntersecting) {
            next.classList.remove(actionVisibilityCSSClass);
          } else if (entry.target === lastTab && !entry.isIntersecting) {
            next.classList.add(actionVisibilityCSSClass);
          }
        }
      },
      {threshold: 0.75}
    );

    this.intersectionObserver.observe(firstTab);
    this.intersectionObserver.observe(lastTab);
  }

  private getHTMLElement(element: 'prev' | 'next' | 'nav' | 'slider'): HTMLElement {
    const selector = {
      prev: 'tabs__action--prev',
      next: 'tabs__action--next',
      slider: 'tabs__slider',
      nav: 'tabs__nav'
    }

    return this.host.shadowRoot.querySelector(`.${prefix(selector[element])}`);
  }

  private getHTMLElements(elements: 'tabs'): HTMLElement[] {
    const selector = {
      tabs: 'tabs__button'
    }

    return Array.from(this.host.shadowRoot.querySelectorAll(`.${prefix(selector[elements])}`));
  }
}
