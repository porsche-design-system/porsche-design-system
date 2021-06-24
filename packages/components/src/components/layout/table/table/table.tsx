import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import {
  getHTMLElement,
  getPrefixedTagNames,
  getScrollByX,
  hasNamedSlot,
  insertSlottedStyles,
  scrollElementBy,
} from '../../../../utils';
import type { TableHeadCellSort } from '../table-utils';
import { addCss, getSlottedCss, SORT_EVENT_NAME } from '../table-utils';

@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  /** A caption describing the contents of the table for accessibility only. This won't be visible in the browser.
   * Use an element with an attribute of slot="name" for a visible caption. */
  @Prop() public caption?: string = '';

  /** Emitted when sorting is changed. */
  @Event({ bubbles: false }) public sortingChange: EventEmitter<TableHeadCellSort>;

  @State() public isScrollIndicatorVisible = false;

  private intersectionObserver: IntersectionObserver;
  private scrollAreaElement: HTMLElement;
  private scrollTriggerElement: HTMLElement;

  public connectedCallback(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
    addCss(this.host);
  }

  public componentWillLoad(): void {
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<TableHeadCellSort>) => {
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
    const hostProps = this.caption
      ? { 'aria-label': this.caption }
      : hasSlottedCaption && { 'aria-describedby': captionId };

    return (
      <Host role="table" {...hostProps}>
        {hasSlottedCaption && (
          <span id={captionId} class="caption">
            <slot name="caption" />
          </span>
        )}
        <div class="root">
          <div class="scroll-area">
            <div class="table">
              <slot />
              <span class="scroll-trigger" />
            </div>
          </div>
          {this.isScrollIndicatorVisible && (
            <div class="scroll-indicator">
              <PrefixedTagNames.pButtonPure
                class="scroll-button"
                aria-hidden="true"
                tabbable={false}
                hide-label="true"
                size="inherit"
                icon="arrow-head-right"
                onClick={this.handleScrollClick}
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
  };

  private initIntersectionObserver = (): void => {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        this.isScrollIndicatorVisible = !entries.some((x) => x.isIntersecting);
      },
      {
        root: this.scrollAreaElement,
        threshold: 0,
      }
    );

    this.intersectionObserver.observe(this.scrollTriggerElement);
  };

  private handleScrollClick = (): void => {
    scrollElementBy(this.scrollAreaElement, getScrollByX(this.scrollAreaElement));
  };
}
