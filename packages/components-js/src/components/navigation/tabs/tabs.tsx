import {Component, h, Element, Event, EventEmitter, Method, State, Prop} from '@stencil/core';
import {CssClassMap} from './tab.class';

@Component({
  tag: 'p-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})

export class Tabs {
  @Prop() public align?: 'left' | 'center' | 'right' = 'left';

  @Element()
  el: HTMLElement;

  @Event({ eventName: 'name' })
  onChange: EventEmitter;

  @State()
  tabs: HTMLPTabElement[] = [];

  componentWillLoad() {
    this.tabs = Array.from(this.el.querySelectorAll('p-tab'));
  }

  @Method()
  async openTab(index: number) {
    if (index >= this.tabs.length) {
      throw new Error(
        `[p-tabs] Index ${index} is out of bounds of tabs length`
      );
    }
    if (!this.tabs[index].disabled) {
      this.tabs = this.tabs.map((tab, i) => {
        tab.active = i === index;
        return tab;
      });
      this.onChange.emit({ tabId: index });
    }
  }

  public render(): JSX.Element {

    const classMap = this.getCssClassMap();

    return (
      <div class={classMap}>
        {this.tabs.map((tab: HTMLPTabElement, index: number) => {
          const tabClassMap: CssClassMap = {
            'tab-button': true,
            active: tab.active
          };

          return (
            <button
              role="tab"
              disabled={tab.disabled}
              class={tabClassMap}
              onClick={() => this.openTab(index)}>
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  }

  private getCssClassMap(): CssClassMap {
    return {
      'tabs-list': true
    };
  }
}
