import { Component, h, Element, Event, EventEmitter, Prop, Host, State, Watch } from '@stencil/core';
import { prefix } from '../../../utils';

export type ChangeTabEvent = { tabIndex: number };

@Component({
  tag: 'p-tab',
  styleUrl: 'tab.scss',
  shadow: true
})
export class Tab {
  @Element() public host!: HTMLElement;

  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  @Prop() public weight?: 'regular' | 'semiBold' = 'regular';

  @Prop() public disabled?: boolean = false;

  @Prop() public activeTab?: number = 0;

  @Event({ eventName: 'initTabs', composed: true })
  onLoad: EventEmitter;

  @Event({ eventName: 'changeTab', composed: true })
  onChange: EventEmitter<ChangeTabEvent>;

  @State()
  tabContentElements: HTMLPTabContentElement[] = [];

  @State() tabSelected: number = 0;

  componentWillLoad() {
    this.setTabContentIndex();
    this.setInitialActiveTab();
  }

  componentDidLoad() {
    this.getTabContentElements();
  }

  @Watch('tabSelected')
  public handleTabChange(): void {
    this.onChange.emit({ tabIndex: this.tabSelected });
  }

  public render(): JSX.Element {
    const tabHeaderClasses = {
      [prefix(`tab__header--align-${this.align}`)]: true,
      [prefix(`tab__header`)]: true
    };

    const tabContentClasses = {
      [prefix('tab__content')]: true
    };

    return (
      <Host>
        <span class={tabHeaderClasses}>{this.renderButtons()}</span>
        <div class={tabContentClasses}>
          <slot />
        </div>
      </Host>
    );
  }

  private renderButtons = () => {
    const buttons: Array<HTMLPTabContentElement> = [];

    this.tabContentElements.map((tab: HTMLPTabContentElement, index: number) => {
      const tabButtonClasses = {
        [prefix(`tab__button`)]: true,
        [prefix(`tab__button--${this.weight}`)]: true,
        [prefix(`tab__button--selected`)]: tab.selected,
        [prefix(`tab__button--disabled`)]: tab.disabled
      };

      buttons.push(
        <button
          role="tab"
          disabled={tab.disabled}
          class={tabButtonClasses}
          onClick={() => {
            this.handleOnClick(index);
          }}
        >
          {tab.label}
        </button>
      );
    });
    return buttons;
  };

  private handleOnClick = (index: number): void => {
    this.tabSelected = index;
  };

  private getTabContentElements = (): void => {
    this.tabContentElements = Array.from(this.host.querySelectorAll('p-tab-content'));
  };

  private setTabContentIndex = (): void => {
    this.host.querySelectorAll('p-tab-content').forEach((tab, index) => tab.setAttribute('index', `${index}`));
  };

  private setInitialActiveTab = (): void => {
    this.onLoad.emit({ activeTab: this.activeTab });
  };
}
