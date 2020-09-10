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
  private intersectionObserverLeft: IntersectionObserver;
  private intersectionObserverRight: IntersectionObserver;
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
    const tabHeaderClasses = {
      [prefix('tabs__header')]: true,
      [prefix(`tabs__header--align-${this.align}`)]: true,
      [prefix(`tabs__header--theme-${this.theme}`)]: true,
      [prefix(`tabs__header--size-${this.size}`)]: true
    };

    const tabContentClasses = {
      [prefix('tabs__content')]: true,
      [prefix(`tabs__content--theme-${this.theme}`)]: true
    };

    const tabIconClasses = {
      [prefix('tabs__icon')]: true
    };
    const tabIconRight = {
      [prefix('tabs__icon--right')]: true
    };
    const tabIconLeft = {
      [prefix('tabs__icon--left')]: true
    };

    return (
      <Host>
        <div class={tabIconClasses}>
          <p-icon class={tabIconLeft} name="arrow-head-left" aria-label="Arrow head left icon" />
          <p-icon class={tabIconRight} name="arrow-head-right" aria-label="Arrow head right icon" />
        </div>
        <nav class={tabHeaderClasses}>
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
        <div class={tabContentClasses}>
          <slot />
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
    this.lastButton = this.host.shadowRoot.querySelector('.p-tabs__header').lastElementChild as HTMLElement;

    this.intersectionObserverLeft = new IntersectionObserver(
      (entry: any) => {
        if (entry[0].isIntersecting) {
          arrowLeft.classList.remove('p-tabs__icon--visible');
          arrowLeft.classList.add('p-tabs__icon--hidden');
        } else {
         arrowLeft.classList.remove('p-tabs__icon--hidden');
         arrowLeft.classList.add('p-tabs__icon--visible');
        }
      },
      { threshold: 1 }
    );

    this.intersectionObserverRight = new IntersectionObserver(
      (entry: any) => {
        if (entry[0].isIntersecting) {
         arrowRight.classList.remove('p-tabs__icon--visible');
         arrowRight.classList.add('p-tabs__icon--hidden');
        } else {
         arrowRight.classList.remove('p-tabs__icon--hidden');
         arrowRight.classList.add('p-tabs__icon--visible');
        }
      },
      { threshold: 1 }
    );

    this.intersectionObserverLeft.observe(this.firstButton);
    this.intersectionObserverRight.observe(this.lastButton);
  }
}
