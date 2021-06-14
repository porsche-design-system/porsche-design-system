import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import { getHTMLElement, getPrefixedTagNames, insertSlottedStyles, isCaptionVisible } from '../../../../utils';
import { addCss, getScrollByX, getSlottedCss, SORT_EVENT_NAME } from '../table-utils';
import type { TableHeadCellSort } from '../table-utils';

@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  // TODO: maybe we should use PTableCaption instead?
  /** A caption describing the contents of the table. */
  @Prop() public caption?: string = '';

  /** Hides the caption but stays accessible for screen readers. */
  @Prop() public hideCaption?: boolean = false;

  /** Emitted when sorting is changed. */
  @Event({ bubbles: false }) public sortingChange: EventEmitter<TableHeadCellSort>;

  @State() public isScrollIndicatorVisible = false;

  private intersectionObserver: IntersectionObserver;
  private scrollInterval: NodeJS.Timeout;
  private scrollAreaElement: HTMLElement;
  private scrollTriggerElement: HTMLElement;

  public connectedCallback(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }

  public componentWillLoad(): void {
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<TableHeadCellSort>) => {
      e.stopPropagation();
      this.sortingChange.emit(e.detail);
    });
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public componentDidLoad(): void {
    this.defineHTMLElements();
    this.initIntersectionObserver();
  }

  public disconnectedCallback(): void {
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host
        role="table"
        {...(isCaptionVisible(this.host, this.caption, this.hideCaption)
          ? { 'aria-describedby': 'caption' }
          : { 'aria-label': this.caption })}
      >
        {isCaptionVisible(this.host, this.caption, this.hideCaption) && (
          <PrefixedTagNames.pText
            tag="span"
            weight="semibold"
            size="{ base: 'medium', m: 'large' }"
            id="caption"
            class="caption"
          >
            {this.caption || <slot name="caption" />}
          </PrefixedTagNames.pText>
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
                onClick={() => this.handleClickOnScrollIndicator()}
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
        for (const { isIntersecting } of entries) {
          this.isScrollIndicatorVisible = !isIntersecting;
        }
      },
      {
        root: this.scrollAreaElement,
        threshold: 0,
      }
    );

    this.intersectionObserver.observe(this.scrollTriggerElement);
  };

  private handleClickOnScrollIndicator = (): void => {
    const scrollLeft = getScrollByX(this.scrollAreaElement);

    if ('scrollBehavior' in document?.documentElement?.style) {
      this.scrollAreaElement.scrollBy({ left: scrollLeft, top: 0, behavior: 'smooth' });
    } else {
      // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
      let i = 0;
      const steps = 20;
      const initialScrollLeft = this.scrollAreaElement.scrollLeft;
      const endScrollLeft = initialScrollLeft + scrollLeft;
      const scrollStep = scrollLeft / steps;

      clearInterval(this.scrollInterval);
      this.scrollInterval = setInterval(() => {
        this.scrollAreaElement.scrollLeft = Math.round(initialScrollLeft + i * scrollStep);
        if (++i >= steps) {
          this.scrollAreaElement.scrollLeft = endScrollLeft;
          clearInterval(this.scrollInterval);
        }
      }, 10);
    }
  };
}
