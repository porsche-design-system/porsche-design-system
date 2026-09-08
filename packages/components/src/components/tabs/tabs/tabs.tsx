import { Component, Element, Event, type EventEmitter, Host, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes, SelectedAriaAttributes } from '../../../types';
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
  TABS_ARIA_ATTRIBUTES,
  TABS_BACKGROUNDS,
  TABS_SIZES,
  TABS_WEIGHTS,
  type TabsAriaAttribute,
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
  aria: AllowedTypes.aria<TabsAriaAttribute>(TABS_ARIA_ATTRIBUTES),
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

  /** Sets the font size of the tab labels using the PDS typographic scale. Supports responsive breakpoint values. */
  @Prop() public size?: BreakpointCustomizable<TabsSize> = 'small';

  /** Sets the zero-based index of the currently active tab; update this prop to switch tabs programmatically. */
  @Prop({ mutable: true }) public activeTabIndex?: number = 0;

  /** Sets the background color of the tabs bar. Use `frosted` only when placed on top of images, videos, or gradients. */
  @Prop() public background?: TabsBackground = 'none';

  /** Reduces the tab height and padding for use in dense layouts where vertical space is limited. */
  @Prop() public compact?: boolean;

  /**
   * @deprecated Will be removed in the next major release.
   * Has no effect anymore. */
  @Prop() public weight?: TabsWeight = 'regular';

  /** Sets ARIA attributes on the tablist, such as `aria-label` and `aria-description`. */
  @Prop() public aria?: SelectedAriaAttributes<TabsAriaAttribute>;

  /** Emitted when the user switches to a different tab, carrying the new `activeTabIndex` in the event detail. */
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
          aria={this.aria}
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
    this.tabsItems.forEach((tab, index) => {
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
