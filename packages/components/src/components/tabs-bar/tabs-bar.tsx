import { Component, Element, Event, type EventEmitter, h, type JSX, Prop, State, Watch } from '@stencil/core';
import type { BreakpointCustomizable, PropTypes } from '../../types';
import {
  AllowedTypes,
  attachComponentCss,
  getOnlyChildrenOfKindHTMLElementOrThrow,
  getPrefixedTagNames,
  getScrollActivePosition,
  getShadowRootHTMLElement,
  hasPropValueChanged,
  isShadowRootParentOfKind,
  observeBreakpointChange,
  parseJSON,
  setAttributes,
  unobserveBreakpointChange,
  validateProps,
} from '../../utils';
import type { ScrollerDirection } from '../scroller/scroller-utils';
import { getComponentCss, scrollerAnimatedCssClass } from './tabs-bar-styles';
import {
  getFocusedTabIndex,
  getPrevNextTabIndex,
  sanitizeActiveTabIndex,
  setBarStyle,
  TABS_BAR_SIZES,
  TABS_BAR_WEIGHTS,
  type TabsBarSize,
  type TabsBarUpdateEventDetail,
  type TabsBarWeight,
} from './tabs-bar-utils';

const propTypes: PropTypes<typeof TabsBar> = {
  size: AllowedTypes.breakpoint<TabsBarSize>(TABS_BAR_SIZES),
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

  /** The text size. */
  @Prop() public size?: BreakpointCustomizable<TabsBarSize> = 'small';

  /** The text weight. */
  @Prop() public weight?: TabsBarWeight = 'regular';

  /** Defines which tab to be visualized as selected (zero-based numbering), undefined if none should be selected. */
  @Prop() public activeTabIndex?: number | undefined;

  /** Emitted when active tab is changed. */
  @Event({ bubbles: false }) public update: EventEmitter<TabsBarUpdateEventDetail>;

  @State() private tabElements: HTMLElement[] = [];

  private internalTabIndex: number = this.activeTabIndex; // to not override and mutate external prop value
  private barElement: HTMLElement;
  private scrollerElement: HTMLPScrollerElement;
  private direction: ScrollerDirection = 'next';
  private hasPTabsParent: boolean;
  private areTabsButtons: boolean;

  @Watch('activeTabIndex')
  public activeTabIndexHandler(_newValue: number, oldValue: number): void {
    // in Angular, when chunk is already loaded and component is rendered almost identical after navigation
    // (or with hot reloading in stackblitz) this watcher is called between `connectedCallback` and `componentDidLoad`
    // this would reset `this.activeTabIndex` to undefined when `this.tabElements = []`
    // so we have a separate `this.internalTabIndex` to not override the prop value
    // https://github.com/porsche-design-system/porsche-design-system/issues/2674
    this.setTabElements();

    this.direction = this.internalTabIndex > oldValue || oldValue === undefined ? 'next' : 'prev';
    this.setBarStyle();
    this.scrollActiveTabIntoView();
  }

  public connectedCallback(): void {
    this.hasPTabsParent = isShadowRootParentOfKind(this.host, 'p-tabs');
    this.observeBreakpointChange(); // on reconnect
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public componentWillLoad(): void {
    this.setTabElements();
  }

  public componentDidLoad(): void {
    this.scrollActiveTabIntoView(false);
    this.observeBreakpointChange(); // initially or slow prop binding

    // TODO: would be great to use this in jsx but that doesn't work reliable or triggers initially when component is rendered via framework
    getShadowRootHTMLElement(this.host, 'slot').addEventListener('slotchange', () => {
      this.setTabElements();
      this.setBarStyle();
    });
  }

  public disconnectedCallback(): void {
    unobserveBreakpointChange(this.host);
  }

  public componentDidRender(): void {
    // 1 tick delay to prevent transition
    window.requestAnimationFrame(() => {
      this.scrollerElement.classList.toggle(scrollerAnimatedCssClass, this.internalTabIndex !== undefined);
    });
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss, this.size, this.weight);
    this.setAccessibilityAttributes();

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <PrefixedTagNames.pScroller
        class="scroller"
        {...(this.areTabsButtons && { aria: { role: 'tablist' } })}
        alignScrollIndicator="top"
        ref={(el: HTMLPScrollerElement) => (this.scrollerElement = el)}
        onClick={this.onClick}
        onKeyDown={this.onKeydown}
      >
        <slot />
        <span class="bar" ref={(el) => (this.barElement = el)} />
      </PrefixedTagNames.pScroller>
    );
  }

  private setAccessibilityAttributes = (): void => {
    this.tabElements.forEach((tab, index) => {
      const isCurrent = this.internalTabIndex === index;
      const attrs = this.areTabsButtons
        ? {
            role: 'tab',
            tabindex: this.internalTabIndex ? (isCurrent ? '0' : '-1') : index === 0 ? '0' : '-1',
            'aria-selected': isCurrent ? 'true' : 'false',
          }
        : {
            'aria-current': isCurrent ? 'true' : 'false',
          };

      setAttributes(tab, attrs);
    });
  };

  private setTabElements = (): void => {
    this.tabElements = getOnlyChildrenOfKindHTMLElementOrThrow(this.host, 'a,button');
    this.areTabsButtons = this.tabElements[0]?.tagName === 'BUTTON';
    this.internalTabIndex = sanitizeActiveTabIndex(this.activeTabIndex, this.tabElements.length); // since watcher doesn't trigger on first render
  };

  private onClick = (e: MouseEvent): void => {
    // e.target can be nested span or font element within a or button when page is translated
    const newTabIndex = this.tabElements.findIndex((el) => el.contains(e.target as HTMLElement));
    if (newTabIndex >= 0) {
      this.onTabClick(newTabIndex);
    }
  };

  private onTabClick = (newTabIndex: number): void => {
    this.update.emit({ activeTabIndex: newTabIndex });
  };

  private onKeydown = (e: KeyboardEvent & { target: HTMLElement }): void => {
    let upcomingFocusedTabIndex: number;
    const focusedTabIndex = this.hasPTabsParent ? this.internalTabIndex || 0 : getFocusedTabIndex(this.tabElements);
    const { target } = e;

    switch (e.key) {
      case 'ArrowLeft':
      case 'Left':
        upcomingFocusedTabIndex = getPrevNextTabIndex('prev', this.tabElements.length, focusedTabIndex);
        break;

      case 'ArrowRight':
      case 'Right':
        upcomingFocusedTabIndex = getPrevNextTabIndex('next', this.tabElements.length, focusedTabIndex);
        break;

      case 'Home':
        upcomingFocusedTabIndex = 0;
        break;

      case 'End':
        upcomingFocusedTabIndex = this.tabElements.length - 1;
        break;

      // the slotted buttons have a different tabbing sequence in chrome and safari and it appears that on hitting
      // tab the first slotted one with tabindex=0 becomes focused instead of the one after,
      // therefor the 'Tab' case needs to be handled
      case 'Tab': {
        if (target.matches('button')) {
          const { tabIndex } = target;
          target.tabIndex = null;
          setTimeout(() => {
            target.tabIndex = tabIndex;
          });
        }
        return;
      }

      default:
        return;
    }

    if (this.hasPTabsParent) {
      this.onTabClick(upcomingFocusedTabIndex);
    }
    if (target.matches('button')) {
      this.tabElements[upcomingFocusedTabIndex].focus();
    }
    // disable default behavior only for buttons and links but not for scrollable container
    if (target.matches('button,a')) {
      e.preventDefault();
    }
  };

  private scrollActiveTabIntoView = (isSmooth = true): void => {
    // scrollAreaElement might be undefined in certain scenarios with framework routing involved
    // where the activeTabIndex watcher triggers this function before the scroller is rendered and the ref defined
    if (this.scrollerElement && this.internalTabIndex !== undefined) {
      const scrollActivePosition = getScrollActivePosition(
        this.tabElements,
        this.direction,
        this.internalTabIndex,
        this.scrollerElement
      );

      this.scrollerElement.scrollToPosition = {
        scrollPosition: scrollActivePosition,
        isSmooth,
      };
    }
  };

  private setBarStyle = (): void => {
    setBarStyle(this.tabElements, this.internalTabIndex, this.barElement);
  };

  private observeBreakpointChange = (): void => {
    if (typeof parseJSON(this.size) === 'object') {
      observeBreakpointChange(this.host, () => {
        this.setBarStyle();
        this.scrollActiveTabIntoView(false);
      });
    }
  };
}
