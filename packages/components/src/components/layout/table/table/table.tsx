import { Component, Element, Event, EventEmitter, h, Host, JSX, Prop, State } from '@stencil/core';
import { getHTMLElement, getPrefixedTagNames, insertSlottedStyles, isCaptionVisible } from '../../../../utils';
import { addCss, getSlottedCss, SORT_EVENT_NAME } from '../table-utils';
import type { TableHeadItem } from '../table-utils';

@Component({
  tag: 'p-table',
  shadow: true,
})
export class Table {
  @Element() public host!: HTMLElement;

  /** A caption describing the contents of the table. */
  @Prop() public caption?: string = '';

  @Event({ bubbles: false }) public sortingChange: EventEmitter<TableHeadItem>;

  @State() public isScrollHelperVisible = false;

  private intersectionObserver: IntersectionObserver;
  private scrollInterval: NodeJS.Timeout;

  public connectedCallback(): void {
    insertSlottedStyles(this.host, getSlottedCss(this.host));
  }

  public componentWillLoad(): void {
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e: CustomEvent<TableHeadItem>) => {
      e.stopPropagation();
      this.sortingChange.emit(e.detail);
    });
  }

  public componentWillRender(): void {
    addCss(this.host);
  }

  public componentDidLoad(): void {
    this.initIntersectionObserver();
  }

  public disconnectedCallback(): void {
    this.intersectionObserver.disconnect();
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host role="table" aria-describedby="caption">
        {isCaptionVisible(this.host, this.caption) && (
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
          {this.isScrollHelperVisible && (
            <div class="scroll-indicator">
              <PrefixedTagNames.pButtonPure
                class="scroll-button"
                aria-hidden="true"
                tabbable={false}
                hide-label="true"
                size="inherit"
                icon="arrow-head-right"
                onClick={() => this.scrollOnNextClick()}
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
    const scrollArea = getHTMLElement(this.host.shadowRoot, '.scroll-area');
    const scrollTrigger = getHTMLElement(this.host.shadowRoot, '.scroll-trigger');

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting } of entries) {
          this.isScrollHelperVisible = !isIntersecting;
        }
      },
      {
        root: scrollArea,
        threshold: 0,
      }
    );

    this.intersectionObserver.observe(scrollTrigger);
  };

  private scrollOnNextClick = (): void => {
    const root = getHTMLElement(this.host.shadowRoot, '.scroll-area');
    const { offsetWidth } = root as HTMLElement;
    const scrollLeft = Math.round(offsetWidth * 0.2);

    if ('scrollBehavior' in document?.documentElement?.style) {
      root.scrollBy({ left: scrollLeft, top: 0, behavior: 'smooth' });
    } else {
      // TODO: this fallback can be removed as soon as all browser support scrollTo option behavior smooth by default
      let i = 0;
      const steps = 20;
      const initialScrollLeft = root.scrollLeft;
      const endScrollLeft = initialScrollLeft + scrollLeft;
      const scrollStep = scrollLeft / steps;

      clearInterval(this.scrollInterval);
      this.scrollInterval = setInterval(() => {
        root.scrollLeft = Math.round(initialScrollLeft + i * scrollStep);
        if (++i >= steps) {
          root.scrollLeft = endScrollLeft;
          clearInterval(this.scrollInterval);
        }
      }, 10);
    }
  };
}
