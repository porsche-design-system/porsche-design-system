import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  AllowedTypes,
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  getScrollByX,
  hasNamedSlot,
  PropTypes,
  scrollElementBy,
  validateProps,
} from '../../../../utils';
import { getComponentCss, getSlottedCss } from './table-styles';
import type { SortingChangeEvent } from './table-utils';
import { SORT_EVENT_NAME, warnIfCaptionIsUndefined } from './table-utils';

const propTypes: PropTypes<typeof Table> = {
  caption: AllowedTypes.string,
};

@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  /** A caption describing the contents of the table for accessibility only. This won't be visible in the browser.
   * Use an element with an attribute of `slot="caption"` for a visible caption. */
  @Prop() public caption?: string;

  /** Emitted when sorting is changed. */
  @Event({ bubbles: false }) public sortingChange: EventEmitter<SortingChangeEvent>;

  @State() private isScrollIndicatorVisible = false;
  @State() private isScrollable = false;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;
  private scrollTriggerElement: HTMLElement;
  private tableElement: HTMLElement;

  public connectedCallback(): void {
    attachComponentCss(this.host, getComponentCss);
    attachSlottedCss(this.host, getSlottedCss);
  }

  public componentWillLoad(): void {
    warnIfCaptionIsUndefined(this.host, this.caption);
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<SortingChangeEvent>) => {
      e.stopPropagation();
      this.sortingChange.emit(e.detail);
    });
  }

  public componentDidLoad(): void {
    this.initIntersectionObserver();
  }

  public componentWillRender(): void {
    validateProps(this, propTypes, 'p-table');
  }

  public disconnectedCallback(): void {
    this.intersectionObserver?.disconnect();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);
    const hasSlottedCaption = hasNamedSlot(this.host, 'caption');
    const captionId = 'caption';
    const tableAttr = this.caption
      ? { 'aria-label': this.caption }
      : hasSlottedCaption && { 'aria-labelledby': captionId };
    const scrollAreaAttr = this.isScrollable && { ...tableAttr, role: 'region', tabindex: '0' };

    return (
      <Host>
        {hasSlottedCaption && (
          <div id={captionId} class="caption">
            <slot name="caption" />
          </div>
        )}
        <div class="root">
          <div class="scroll-area" {...scrollAreaAttr} ref={(el) => (this.scrollAreaElement = el)}>
            <div class="table" role="table" {...tableAttr} ref={(el) => (this.tableElement = el)}>
              <slot />
              <span class="scroll-trigger" ref={(el) => (this.scrollTriggerElement = el)} />
            </div>
          </div>
          {this.isScrollIndicatorVisible && (
            <div class="scroll-indicator">
              <PrefixedTagNames.pButtonPure
                class="scroll-button"
                aria-hidden="true"
                type="button"
                tabbable={false}
                hide-label="true"
                size="inherit"
                icon="arrow-head-right"
                onClick={this.onScrollClick}
              >
                Next
              </PrefixedTagNames.pButtonPure>
            </div>
          )}
        </div>
      </Host>
    );
  }

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === this.scrollTriggerElement) {
            this.isScrollIndicatorVisible = !isIntersecting;
          } else if (target === this.tableElement) {
            this.isScrollable = !isIntersecting;
          }
        }
      },
      {
        root: this.scrollAreaElement,
        threshold: 1,
      }
    );

    this.intersectionObserver.observe(this.scrollTriggerElement); // to check if table should show a scroll indicator
    this.intersectionObserver.observe(this.tableElement); // to check if table is scrollable in general
  };

  private onScrollClick = (): void => {
    scrollElementBy(this.scrollAreaElement, getScrollByX(this.scrollAreaElement));
  };
}
