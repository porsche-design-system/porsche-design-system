import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  attachComponentCss,
  attachSlottedCss,
  getHTMLElement,
  getPrefixedTagNames,
  getScrollByX,
  hasNamedSlot,
  scrollElementBy,
} from '../../../../utils';
import { getComponentCss, getSlottedCss } from './table-styles';
import { warnIfCaptionIsUndefined, SORT_EVENT_NAME } from './table-utils';
import type { SortingChangeEvent } from './table-utils';

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

  @State() public isScrollIndicatorVisible = false;
  @State() public isScrollable = false;

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
    this.defineHTMLElements();
    this.initIntersectionObserver();
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
          <div class="scroll-area" {...scrollAreaAttr}>
            <div class="table" role="table" {...tableAttr}>
              <slot />
              <span class="scroll-trigger" />
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

  private defineHTMLElements = (): void => {
    const { shadowRoot } = this.host;
    this.scrollAreaElement = getHTMLElement(shadowRoot, '.scroll-area');
    this.scrollTriggerElement = getHTMLElement(shadowRoot, '.scroll-trigger');
    this.tableElement = getHTMLElement(shadowRoot, '.table');
  };

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
