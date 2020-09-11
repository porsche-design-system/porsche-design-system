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

  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  @Prop() public weight?: Extract<TextWeight, 'regular' | 'semibold'> = 'regular';

  @Prop() public theme?: Theme = 'light';

  @Prop() public size?: 'small' | 'medium' = 'medium';

  @State() public tabsItems: HTMLPTabsItemElement[] = Array.from(this.host.querySelectorAll('p-tabs-item'));

  @Prop({ reflect: true }) public activeTab?: number = this.tabsItems.findIndex((tab) => tab.selected);

  private hostObserver: MutationObserver;
  private intersectionObserver: IntersectionObserver;
  private firstButton: HTMLElement;
  private lastButton: HTMLElement;

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
    this.addIntersectionObserver();
  }

  public disconnectedCallback(): void {
    this.hostObserver.disconnect();
  }

  public render(): JSX.Element {
    const hostClasses = {
      [prefix('tabs__host')]: true,
      [prefix(`tabs__host--theme-${this.theme}`)]: true
    };

    const tabHeaderClasses = {
      [prefix('tabs__header')]: true
    };

    const tabNavClasses = {
      [prefix('tabs__nav')]: true,
      [prefix(`tabs__nav--align-${this.align}`)]: true,
      [prefix(`tabs__nav--theme-${this.theme}`)]: true,
      [prefix(`tabs__nav--size-${this.size}`)]: true
    };

    const tabContentClasses = {
      [prefix('tabs__content')]: true
    };

    const tabIconClasses = {
      [prefix('tabs__icon')]: true
    };

    const tabIconRight = {
      ...tabIconClasses,
      [prefix('tabs__icon--right')]: true,
      [prefix(`tabs__icon--right--theme-${this.theme}`)]: true
    };
    const tabIconLeft = {
      ...tabIconClasses,
      [prefix('tabs__icon--left')]: true,
      [prefix(`tabs__icon--left--theme-${this.theme}`)]: true
    };

    return (
      <Host>
        <div class={hostClasses}>
          <div class={tabHeaderClasses}>
            <p-icon class={tabIconLeft} theme={this.theme} name="arrow-head-left" aria-label="Arrow head left icon" />
            <nav class={tabNavClasses}>
              {this.tabsItems.map((tab, index) => {
                const tabButtonClasses = {
                  [prefix('tabs__button')]: true,
                  [prefix(`tabs__button--${this.weight}`)]: true,
                  [prefix('tabs__button--selected')]: tab.selected,
                  [prefix('tabs__button--disabled')]: tab.disabled
                };

                const Tag = tab.href === undefined ? 'button' : 'a';
                const props = (({ href, target, disabled }) => ({ href, target, disabled }))(tab);

                return (
                  // use p-button-pure?
                  <Tag class={tabButtonClasses} role="tab" {...props} onClick={() => this.handleTabChange(index)}>
                    {tab.label}
                  </Tag>
                );
              })}
            </nav>
            <p-icon
              class={tabIconRight}
              theme={this.theme}
              name="arrow-head-right"
              aria-label="Arrow head right icon"
            />
          </div>
          <div class={tabContentClasses}>
            <slot />
          </div>
        </div>
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
    this.setActiveTab(newActiveTab ?? this.activeTab);
  };

  private updateTabItems = (): void => {
    this.tabsItems = Array.from(this.host.querySelectorAll('p-tabs-item'));
  };

  private observeHost(): void {
    this.hostObserver = new MutationObserver((mutations): void => {
      if (mutations.filter(({ type }) => type === 'childList' || type === 'attributes')) {
        this.updateTabItems();
      }
    });
    this.hostObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributeFilter: ['label', 'href', 'target']
    });
  }

  private addIntersectionObserver(): void {
    const allArrows = this.host.shadowRoot.querySelectorAll('.p-tabs__icon');
    const arrowLeft = this.host.shadowRoot.querySelector('.p-tabs__icon--left');
    const arrowRight = this.host.shadowRoot.querySelector('.p-tabs__icon--right');

    if (isTouchDevice()) {
      allArrows.forEach((el) => el.classList.add('p-tabs__icon--hidden'));
      return;
    }

    this.firstButton = this.host.shadowRoot.querySelector('.p-tabs__button');
    const allButtons = this.host.shadowRoot.querySelectorAll('.p-tabs__button');
    this.lastButton = allButtons[allButtons.length - 1]  as HTMLElement;

    this.intersectionObserver = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: { target: HTMLElement; isIntersecting: boolean }) => {
          const arrow = entry.target === this.firstButton ? arrowLeft : arrowRight;
          console.log(entry.target);
          if (arrow === arrowLeft && entry.isIntersecting) {
            arrow.classList.add('p-tabs__icon--hidden');
            arrow.classList.remove('p-tabs__icon--visible');
          } else if (arrow === arrowRight && !entry.isIntersecting) {
            arrow.classList.remove('p-tabs__icon--hidden');
            arrow.classList.add('p-tabs__icon--visible');
          } else if (arrow === arrowRight && entry.isIntersecting) {
            arrow.classList.add('p-tabs__icon--hidden');
            arrow.classList.remove('p-tabs__icon--visible');
          } else {
            arrow.classList.remove('p-tabs__icon--hidden');
            arrow.classList.add('p-tabs__icon--visible');
          }
        });
      },
      { threshold: 0.9}
    );

    this.intersectionObserver.observe(this.firstButton);
    this.intersectionObserver.observe(this.lastButton);
  }
}
