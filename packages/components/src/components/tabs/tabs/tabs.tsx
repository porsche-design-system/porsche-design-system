import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  removeAttribute,
  setAttribute,
  setAttributes,
  throwIfChildrenAreNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './tabs-styles';
import { TABS_SIZES, TABS_WEIGHTS, type TabsSize, type TabsUpdateEventDetail, type TabsWeight } from './tabs-utils';

const propTypes: PropTypes<typeof Tabs> = {
  size: AllowedTypes.breakpoint<TabsSize>(TABS_SIZES),
  weight: AllowedTypes.oneOf<TabsWeight>(TABS_WEIGHTS),
  activeTabIndex: AllowedTypes.number,
};

/**
 * @slot {"name": "", "description": "Default slot for the `p-tabs-item` tags." }
 *
 * @controlled { "props": ["activeTabIndex"], "event": "update", "isInternallyMutated": true }
 */
@Component({
  tag: 'p-tabs',
  shadow: true,
})
export class Tabs {
  @Element() public host!: HTMLElement;

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabsSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabsWeight = 'regular';

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsUpdateEventDetail>;

  @State() private tabsItemElements: HTMLPTabsItemElement[] = [];

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.setAccessibilityAttributes();
    this.update.emit({ activeTabIndex: newValue });
  }

  public componentWillLoad(): void {
    this.defineTabsItemElements();
  }

  public componentDidLoad(): void {
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', this.defineTabsItemElements);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentDidRender(): void {
    this.setAccessibilityAttributes();
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host>
        <PrefixedTagNames.pTabsBar
          class="root"
          size={this.size}
          weight={this.weight}
          activeTabIndex={this.activeTabIndex}
          onUpdate={this.onTabsBarUpdate}
          onTabChange={(e: Event) => e.stopPropagation()} // prevent double event emission because of identical name
        >
          {this.tabsItemElements.map((tab, index) => (
            <button key={index} type="button">
              {tab.label}
            </button>
          ))}
        </PrefixedTagNames.pTabsBar>
        <slot />
      </Host>
    );
  }

  private defineTabsItemElements = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-tabs-item');
    this.tabsItemElements = Array.from(this.host.children) as HTMLPTabsItemElement[];
  };

  private setAccessibilityAttributes = (): void => {
    this.tabsItemElements.forEach((tab, index) => {
      const attrs = {
        role: 'tabpanel',
        'aria-label': tab.label,
      };
      setAttributes(tab, attrs);

      if (index === this.activeTabIndex) {
        removeAttribute(tab, 'hidden');
        setAttribute(tab, 'tabindex', '0');
      } else {
        setAttribute(tab, 'hidden');
        removeAttribute(tab, 'tabindex');
      }
    });
  };

  private onTabsBarUpdate = (e: CustomEvent<TabsUpdateEventDetail>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
