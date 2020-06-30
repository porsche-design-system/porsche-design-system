import { Component, Event, Element, EventEmitter, h, JSX, Prop, State, Watch } from '@stencil/core';
import cx from 'classnames';
import { BreakpointCustomizable, mapBreakpointPropToPrefixedClasses, prefix } from '../../../utils';
import {
  createPaginationModel,
  getCurrentActivePage,
  getTotalPages,
  itemTypes,
  PaginationModelItem
} from './pagination-helper';
import { listenResize } from '../../../utils/window-resize-listener';
import { readCounterResetValue } from '../../../utils/counter-reset-reader';
import { improveFocusHandlingForCustomElement } from '../../../utils/focusHandling';

export type NumberOfPageLinks = 5 | 7;

@Component({
  tag: 'p-pagination',
  styleUrl: 'pagination.scss',
  shadow: true
})
export class Pagination {
  @Element() public element!: HTMLElement;

  /** The total count of items. */
  @Prop() public totalItemsCount = 1;

  /** The total count of items which should be shown per page.  */
  @Prop() public itemsPerPage = 1;

  /** Index of the currently active page. */
  @Prop({
    reflect: true,
    mutable: true
  })
  public activePage?: number = 1;

  /** The maximum number of page links rendered */
  @Prop() public maxNumberOfPageLinks?: NumberOfPageLinks | BreakpointCustomizable<NumberOfPageLinks> = {
    base: 5,
    xs: 7
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
  @Prop() public theme?: 'light' | 'dark' = 'light';

  /** Emitted when the page changes. */
  @Event() public pageChange!: EventEmitter;

  @State() public breakpointMaxNumberOfPageLinks: number;

  private unlistenResize: () => void;
  private navigationElement: HTMLElement;

  @Watch('activePage')
  public onActivePageChange(page: number, previousPage: number): void {
    this.pageChange.emit({ page, previousPage });
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.element);
    this.unlistenResize = listenResize(() => {
      this.updateMaxNumberOfPageLinks();
    });

    this.updateMaxNumberOfPageLinks();
  }

  public componentDidUnload(): void {
    this.unlistenResize();
  }

  public render(): JSX.Element {
    const breakpointClasses = mapBreakpointPropToPrefixedClasses('pagination--size', this.maxNumberOfPageLinks);
    const pageRange = this.breakpointMaxNumberOfPageLinks === 7 ? 1 : 0;

    const paginationClasses = cx(breakpointClasses, prefix('pagination'), prefix(`pagination--theme-${this.theme}`));
    const paginationItemsClasses = cx(prefix('pagination__items'));
    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const activePage = getCurrentActivePage(this.activePage, pageTotal);

    // generate pagination items
    const createPaginationItems = (): {
      prevItem: JSX.Element;
      pageItems: JSX.Element[];
      nextItem: JSX.Element;
    } => {
      const paginationModel = createPaginationModel({
        activePage,
        pageTotal,
        pageRange
      });
      const pageItems: JSX.Element[] = [];
      let prevItem: JSX.Element[];
      let nextItem: JSX.Element[];

      const paginationItemClasses = cx(prefix('pagination__item'));

      paginationModel.forEach((pageModel: PaginationModelItem) => {
        if (pageModel.type === itemTypes.PREVIOUS_PAGE_LINK) {
          const paginationPrevClasses = cx(
            prefix('pagination__prev'),
            !pageModel.isActive && prefix('pagination__prev--disabled')
          );

          return (prevItem = (
            <li {...pageModel} class={paginationItemClasses}>
              <span
                class={paginationPrevClasses}
                role={'button'}
                tabIndex={pageModel.isActive ? 0 : null}
                onClick={() => this.onClick(pageModel.value)}
                onKeyDown={(e: KeyboardEvent) => this.onKeyDown(e, pageModel.value)}
                aria-disabled={!pageModel.isActive && 'true'}
                aria-label={this.allyLabelPrev}
              >
                <p-icon name="arrow-head-left" color="inherit" />
              </span>
            </li>
          ));
        }
        if (pageModel.type === itemTypes.ELLIPSIS) {
          const paginationGoToClasses = cx(prefix('pagination__goto'), prefix('pagination__goto--ellipsis'));
          pageItems.push(
            <li {...pageModel} class={paginationItemClasses}>
              <span class={paginationGoToClasses} />
            </li>
          );
        }
        if (pageModel.type === itemTypes.PAGE) {
          const paginationGoToClasses = cx(
            prefix('pagination__goto'),
            pageModel.isActive && prefix('pagination__goto--current')
          );
          pageItems.push(
            <li {...pageModel} class={paginationItemClasses}>
              <span
                class={paginationGoToClasses}
                role={'button'}
                tabIndex={pageModel.isActive ? null : 0}
                aria-disabled={pageModel.isActive && 'true'}
                onClick={() => this.onClick(pageModel.value)}
                onKeyDown={(e: KeyboardEvent) => this.onKeyDown(e, pageModel.value)}
                aria-label={`${this.allyLabelPage} ${pageModel.value}`}
                aria-current={pageModel.isActive && 'page'}
              >
                {pageModel.value}
              </span>
            </li>
          );
        }
        if (pageModel.type === itemTypes.NEXT_PAGE_LINK) {
          const paginationNextClasses = cx(
            prefix('pagination__next'),
            !pageModel.isActive && prefix('pagination__next--disabled')
          );

          return (nextItem = (
            <li {...pageModel} class={paginationItemClasses}>
              <span
                class={paginationNextClasses}
                role={'button'}
                tabIndex={pageModel.isActive ? 0 : null}
                onClick={() => this.onClick(pageModel.value)}
                onKeyDown={(e: KeyboardEvent) => this.onKeyDown(e, pageModel.value)}
                aria-disabled={!pageModel.isActive && 'true'}
                aria-label={this.allyLabelNext}
              >
                <p-icon name="arrow-head-right" color="inherit" />
              </span>
            </li>
          ));
        }
      });

      return {
        prevItem,
        pageItems,
        nextItem
      };
    };

    const paginationItems = createPaginationItems();
    return (
      <nav
        class={paginationClasses}
        role="navigation"
        aria-label={this.allyLabel}
        ref={(el) => (this.navigationElement = el)}
      >
        <ul class={paginationItemsClasses}>
          {paginationItems.prevItem}
          {paginationItems.pageItems}
          {paginationItems.nextItem}
        </ul>
      </nav>
    );
  }

  private onKeyDown(event: KeyboardEvent, page: number): void {
    /**
     * from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
     */
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
      /**
       * Prevent the default action to stop scrolling when space is pressed
       */
      event.preventDefault();
      this.onClick(page);
    }
  }

  private onClick(page: number): void {
    if (page !== this.activePage) {
      this.activePage = page;
    }
  }

  private updateMaxNumberOfPageLinks(): void {
    const { size } = readCounterResetValue(this.navigationElement);
    this.breakpointMaxNumberOfPageLinks = size;
  }
}
