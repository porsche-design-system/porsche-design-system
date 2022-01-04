import { Component, Event, Element, EventEmitter, h, JSX, Prop, State } from '@stencil/core';
import { attachComponentCss, getPrefixedTagNames, improveFocusHandlingForCustomElement } from '../../../utils';
import {
  createPaginationModel,
  getCounterResetValue,
  getCurrentActivePage,
  getTotalPages,
  itemTypes,
} from './pagination-utils';
import type { NumberOfPageLinks, PageChangeEvent } from './pagination-utils';
import type { BreakpointCustomizable, Theme } from '../../../types';
import { listenResize } from '../../../utils/window-resize-listener';
import { getComponentCss } from './pagination-styles';

@Component({
  tag: 'p-pagination',
  shadow: true,
})
export class Pagination {
  @Element() public host!: HTMLElement;

  /** The total count of items. */
  @Prop() public totalItemsCount = 1;

  /** The total count of items which should be shown per page.  */
  @Prop() public itemsPerPage = 1;

  /** Index of the currently active page. */
  @Prop({ mutable: true }) public activePage?: number = 1;

  /** The maximum number of page links rendered */
  @Prop() public maxNumberOfPageLinks?: BreakpointCustomizable<NumberOfPageLinks> = {
    base: 5,
    xs: 7,
  };

  /** Aria label what the pagination is used for. */
  @Prop() public allyLabel?: string = 'Pagination';

  /** Aria label for previous page icon. */
  @Prop() public allyLabelPrev?: string = 'Previous page';

  /** Aria label for page navigation. */
  @Prop() public allyLabelPage?: string = 'Page';

  /** Aria label for next page icon. */
  @Prop() public allyLabelNext?: string = 'Next page';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the page changes. */
  @Event({ bubbles: false }) public pageChange: EventEmitter<PageChangeEvent>;

  @State() public breakpointMaxNumberOfPageLinks: number;

  private navigationElement: HTMLElement;

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    this.unlistenResize = listenResize(this.updateMaxNumberOfPageLinks);

    this.updateMaxNumberOfPageLinks(); // TODO: this causes initial rerender
  }

  public componentWillRender(): void {
    attachComponentCss(this.host, getComponentCss, this.maxNumberOfPageLinks, this.theme);
  }

  public disconnectedCallback(): void {
    this.unlistenResize();
  }

  public render(): JSX.Element {
    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);

    const paginationModel = createPaginationModel({
      activePage: getCurrentActivePage(this.activePage, pageTotal),
      pageTotal,
      pageRange: this.breakpointMaxNumberOfPageLinks === 7 ? 1 : 0,
    });

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <nav role="navigation" aria-label={this.allyLabel} ref={(el) => (this.navigationElement = el)}>
        <ul>
          {paginationModel.map((pageModel) => {
            const { type, isActive, value } = pageModel;
            const spanProps = {
              role: 'button',
              onClick: () => this.onClick(value),
              onKeyDown: (e) => this.onKeyDown(e, value),
            };

            switch (type) {
              case itemTypes.PREVIOUS_PAGE_LINK:
                return (
                  <li>
                    <span
                      {...spanProps}
                      tabIndex={isActive ? 0 : null}
                      aria-disabled={!isActive ? 'true' : null}
                      aria-label={this.allyLabelPrev}
                    >
                      <PrefixedTagNames.pIcon name="arrow-head-left" color="inherit" aria-hidden="true" />
                    </span>
                  </li>
                );

              case itemTypes.ELLIPSIS:
                return (
                  <li>
                    <span class="ellipsis" />
                  </li>
                );

              case itemTypes.PAGE:
                return (
                  <li>
                    <span
                      {...spanProps}
                      tabIndex={0}
                      aria-label={`${this.allyLabelPage} ${value}`}
                      aria-current={isActive ? 'page' : null}
                    >
                      {value}
                    </span>
                  </li>
                );

              case itemTypes.NEXT_PAGE_LINK:
                return (
                  <li>
                    <span
                      {...spanProps}
                      tabIndex={isActive ? 0 : null}
                      aria-disabled={!isActive ? 'true' : null}
                      aria-label={this.allyLabelNext}
                    >
                      <PrefixedTagNames.pIcon name="arrow-head-right" color="inherit" aria-hidden="true" />
                    </span>
                  </li>
                );
            }
          })}
        </ul>
      </nav>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private unlistenResize: () => void = () => {};

  private onKeyDown(event: KeyboardEvent, page: number): void {
    /**
     * from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
     */
    const { key } = event;
    if (key === ' ' || key === 'Enter' || key === 'Spacebar') {
      /**
       * Prevent the default action to stop scrolling when space is pressed
       */
      event.preventDefault();
      this.onClick(page);
    }
  }

  private onClick(page: number): void {
    if (page !== this.activePage) {
      this.pageChange.emit({ page, previousPage: this.activePage });
      this.activePage = page; // TODO: should become a controlled component
    }
  }

  private updateMaxNumberOfPageLinks = (): void => {
    this.breakpointMaxNumberOfPageLinks = getCounterResetValue(this.navigationElement);
  };
}
