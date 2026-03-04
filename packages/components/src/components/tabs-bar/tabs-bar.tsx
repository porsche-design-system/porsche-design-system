import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getOnlyChildrenOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  hasPropValueChanged,
  isShadowRootParentOfKind,
  setAttributes,
  validateProps,
} from '../../utils';
import { getComponentCss } from './tabs-bar-styles';
import {
  animateBar,
  getActiveElementIndex,
  getUpcomingActiveElementIndex,
  isTabList,
  scrollTabIntoView,
  TABS_BAR_BACKGROUNDS,
  TABS_BAR_SIZES,
  TABS_BAR_WEIGHTS,
  type TabsBarBackground,
  type TabsBarSize,
  type TabsBarUpdateEventDetail,
  type TabsBarWeight,
} from './tabs-bar-utils';

const propTypes: PropTypes<typeof TabsBar> = {
  background: AllowedTypes.oneOf<TabsBarBackground>(TABS_BAR_BACKGROUNDS),
  size: AllowedTypes.breakpoint<TabsBarSize>(TABS_BAR_SIZES),
  compact: AllowedTypes.boolean,
  weight: AllowedTypes.oneOf<TabsBarWeight>(TABS_BAR_WEIGHTS),
  activeTabIndex: AllowedTypes.number,
};

/**
 * @slot {"name": "", "description": "Default slot for the `button` or `a` tags which will be rendered as tabs." }
 *
 * @controlled {"props": ["activeTabIndex"], "event": "update"}
 */
@Component({
  tag: 'p-tabs-bar',
  shadow: true,
})
export class TabsBar {
  @Element() public host!: HTMLElement;

  /** Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. */
  @Prop() public activeTabIndex?: number | undefined;

  /** Defines the background color. Use `frosted` only on images, videos or gradients. */
  @Prop() public background?: TabsBarBackground = 'none';

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabsBarSize> = 'small';

  /** Displays the tabs-bar in compact mode. */
  @Prop() public compact?: boolean;

  /**
   * @deprecated Will be removed in the next major release.
   * Has no effect anymore. */
  @Prop() public weight?: TabsBarWeight = 'regular';

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsBarUpdateEventDetail>;

  @State() private tabs: HTMLElement[] = [];

  private bar: HTMLElement;
  private scroller: HTMLElement;
  private slot: HTMLSlotElement;
  private hasPTabsParent: boolean;
  private isTabList: boolean;
  private resizeObserver: ResizeObserver;

  @Watch('activeTabIndex')
  public activeTabIndexHandler(newValue: number, oldValue: number): void {
    // animateBar() only needs to be called for animation between two different tabs while active state itself is handled in styles directly
    animateBar(newValue, oldValue, this.scroller, this.tabs, this.bar);
    scrollTabIntoView(newValue, this.scroller, this.tabs);
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isShadowRootParentOfKind(this.host, 'p-tabs');
  }

  public disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
    this.slot?.removeEventListener('slotchange', this.onSlotChange);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillLoad(): void {
    this.defineTabs();
  }

  public componentDidLoad(): void {
    // it would be better to use `<slot onslotchange={() => {}} />` in jsx but that doesn't work reliable or triggers initially when component is rendered via js framework
    this.slot.addEventListener('slotchange', this.onSlotChange);
    scrollTabIntoView(this.activeTabIndex, this.scroller, this.tabs, false);
    this.resizeObserver = new ResizeObserver(() => {
      scrollTabIntoView(this.activeTabIndex, this.scroller, this.tabs, false);
    });
    this.resizeObserver.observe(this.scroller);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.background, this.size, this.compact);

    this.setAccessibilityAttributes();

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pScroller
        class="scroller"
        compact={this.compact}
        {...(this.isTabList && { aria: { role: 'tablist' } })}
        ref={(el: HTMLElement) => (this.scroller = el)}
        onClick={this.onClick}
        onKeyDown={this.onKeydown}
      >
        <slot ref={(el: HTMLSlotElement) => (this.slot = el)} />
        <span class="bar" ref={(el) => (this.bar = el)} />
      </PrefixedTagNames.pScroller>
    );
  }

  private setAccessibilityAttributes = (): void => {
    const hasActiveTabIndex = this.activeTabIndex !== undefined;

    for (const [index, tab] of this.tabs.entries()) {
      const isActiveTabIndex = this.activeTabIndex === index;
      const attrs = this.isTabList
        ? {
            role: 'tab',
            tabindex: hasActiveTabIndex ? (isActiveTabIndex ? '0' : '-1') : index === 0 ? '0' : '-1',
            'aria-selected': isActiveTabIndex ? 'true' : 'false',
          }
        : {
            'aria-current': isActiveTabIndex ? 'true' : 'false',
          };

      setAttributes(tab, attrs);
    }
  };

  private defineTabs = (): void => {
    this.tabs = getOnlyChildrenOfKindHTMLElementOrThrow(this.host, 'a,button');
    this.isTabList = isTabList(this.tabs);
  };

  private onSlotChange = (): void => {
    this.defineTabs();
    scrollTabIntoView(this.activeTabIndex, this.scroller, this.tabs, false);
  };

  private onClick = (e: MouseEvent): void => {
    // e.target can be nested span or font element within a or button
    const newActiveTabIndex = this.tabs.findIndex((el) => el.contains(e.target as HTMLElement));
    if (newActiveTabIndex >= 0) {
      this.emitUpdateEvent(newActiveTabIndex);
    }
  };

  private onKeydown = (e: KeyboardEvent & { target: HTMLElement }): void => {
    let upcomingActiveElementIndex: number | undefined;
    const activeElementIndex = this.hasPTabsParent
      ? (this.activeTabIndex ?? 0)
      : (getActiveElementIndex(this.tabs) ?? 0);
    const { target } = e;

    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        upcomingActiveElementIndex = getUpcomingActiveElementIndex('prev', this.tabs, activeElementIndex);
        break;

      case 'ArrowRight':
      case 'Right':
        upcomingActiveElementIndex = getUpcomingActiveElementIndex('next', this.tabs, activeElementIndex);
        break;

      case 'Home':
        upcomingActiveElementIndex = 0;
        break;

      case 'End':
        upcomingActiveElementIndex = this.tabs.length - 1;
        break;

      // the slotted buttons have a different tabbing sequence in chrome and safari and it appears that on hitting
      // tab the first slotted one with tabindex=0 becomes focused instead of the one after,
      // therefor the 'Tab' case needs to be handled
      case 'Tab': {
        if (target.matches('button')) {
          const { tabIndex } = target;
          target.removeAttribute('tabindex');
          setTimeout(() => {
            target.tabIndex = tabIndex;
          });
        }
        return;
      }

      default:
        return;
    }

    if (upcomingActiveElementIndex !== undefined) {
      if (this.hasPTabsParent) {
        this.emitUpdateEvent(upcomingActiveElementIndex);
      }

      if (target.matches('button')) {
        this.tabs[upcomingActiveElementIndex].focus();
      }

      // disable default behavior only for buttons and links but not for scrollable container
      if (target.matches('button,a')) {
        e.preventDefault();
      }
    }
  };

  private emitUpdateEvent = (newActiveTabIndex: number): void => {
    this.update.emit({ activeTabIndex: newActiveTabIndex });
  };
}
