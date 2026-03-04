import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getPrefixedTagNames,
  hasPropValueChanged,
  removeAttribute,
  setAttribute,
  setAttributes,
  throwIfChildrenAreNotOfKind,
  validateProps,
} from '../../../utils';
import { getComponentCss } from './tabs-styles';
import {
  TABS_BACKGROUNDS,
  TABS_SIZES,
  TABS_WEIGHTS,
  type TabsBackground,
  type TabsSize,
  type TabsUpdateEventDetail,
  type TabsWeight,
} from './tabs-utils';

const propTypes: PropTypes<typeof Tabs> = {
  size: AllowedTypes.breakpoint<TabsSize>(TABS_SIZES),
  activeTabIndex: AllowedTypes.number,
  background: AllowedTypes.oneOf<TabsBackground>(TABS_BACKGROUNDS),
  compact: AllowedTypes.boolean,
  weight: AllowedTypes.oneOf<TabsWeight>(TABS_WEIGHTS),
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

  /** Defines which tab to be visualized as selected (zero-based numbering). */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /** Defines the background color. Use `frosted` only on images, videos or gradients. */
  @Prop() public background?: TabsBackground = 'none';

  /** Displays the tabs-bar in compact mode. */
  @Prop() public compact?: boolean;

  /**
   * @deprecated Will be removed in the next major release.
   * Has no effect anymore. */
  @Prop() public weight?: TabsWeight = 'regular';

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsUpdateEventDetail>;

  @State() private tabsItems: HTMLPTabsItemElement[] = [];

  private slot: HTMLSlotElement;

  @Watch('activeTabIndex')
  public activeTabHandler(newValue: number): void {
    this.update.emit({ activeTabIndex: newValue });
  }

  public disconnectedCallback(): void {
    this.slot?.removeEventListener('slotchange', this.defineTabsItems);
  }

  public componentWillLoad(): void {
    this.defineTabsItems();
  }

  public componentDidLoad(): void {
    // it would be better to use `<slot onslotchange={() => {}} />` in jsx but that doesn't work reliable or triggers initially when component is rendered via js framework
    this.slot.addEventListener('slotchange', this.defineTabsItems);
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
          background={this.background}
          compact={this.compact}
          activeTabIndex={this.activeTabIndex}
          onUpdate={this.onTabsBarUpdate}
        >
          {this.tabsItems.map((tab, index) => (
            <button key={index} type="button">
              {tab.label}
            </button>
          ))}
        </PrefixedTagNames.pTabsBar>
        <slot ref={(el: HTMLSlotElement) => (this.slot = el)} />
      </Host>
    );
  }

  private defineTabsItems = (): void => {
    throwIfChildrenAreNotOfKind(this.host, 'p-tabs-item');
    this.tabsItems = Array.from(this.host.children) as HTMLPTabsItemElement[];
  };

  private setAccessibilityAttributes = (): void => {
    for (const [index, tab] of this.tabsItems.entries()) {
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
    }
  };

  private onTabsBarUpdate = (e: CustomEvent<TabsUpdateEventDetail>): void => {
    e.stopPropagation(); // prevent double event emission because of identical name
    this.activeTabIndex = e.detail.activeTabIndex;
  };
}
