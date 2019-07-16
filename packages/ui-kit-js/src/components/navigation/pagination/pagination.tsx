import { JSX, Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import cx from 'classnames';
import { throttle } from 'throttle-debounce';
import { prefix, matchBreakpoint } from '../../../utils';
import {
  getTotalPages,
  getCurrentActivePage,
  createPaginationModel,
  PaginationModelItem,
  itemTypes
} from './pagination-helper';

@Component({
  tag: 'p-pagination',
  styleUrl: 'pagination.scss',
  shadow: true
})
export class Pagination {
  /** The total count of items. */
  @Prop() public totalItemsCount: number;

  /** The total count of items which should be shown per page.  */
  @Prop() public itemsPerPage: number;

  /** Index of the currently active page. */
  @Prop() public activePage?: number = 1;

  /** The number of pages between ellipsis. 'small' = mobile | 'large' = desktop | 'auto' = breakpoint specific */
  @Prop() public pageRange?: 'small' | 'large' | 'auto' = 'auto';

  /** Aria label what the pagination is used for. */
  @Prop() public label?: string = 'Pagination';

  /** Aria label for previous page icon. */
  @Prop() public labelPrev?: string = 'Previous page';

  /** Aria label for page navigation. */
  @Prop() public labelPage?: string = 'Page';

  /** Aria label for next page icon. */
  @Prop() public labelNext?: string = 'Next page';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: 'light' | 'dark' = 'light';

  /** Emitted when the link is clicked. */
  @Event() public pClick!: EventEmitter;

  /** changes pageRange if prop is set as 'auto' */
  @State() private pageRangeAuto?: 0 | 1;

  public render(): JSX.Element {
    if (this.pageRange === 'auto') {
      const updatePageRange = () => {
        matchBreakpoint('s') ? (this.pageRangeAuto = 1) : (this.pageRangeAuto = 0);
      };
      updatePageRange();
      window.addEventListener(
        'resize',
        throttle(500, () => {
          updatePageRange();
        })
      );
    }

    const pageRange: number = this.pageRange !== 'auto' ? (this.pageRange === 'large' ? 1 : 0) : this.pageRangeAuto;
    const paginationClasses = cx(prefix('pagination'), this.theme === 'dark' && prefix('pagination--theme-dark'));
    const paginationItemsClasses = cx(prefix('pagination__items'));
    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const activePage = getCurrentActivePage(this.activePage, pageTotal);

    // generate pagination items
    const createPaginationItems = () => {
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
            pageModel.isActive && prefix('pagination__prev--disabled')
          );

          return (prevItem = (
            <li {...pageModel} class={paginationItemClasses}>
              <a
                class={paginationPrevClasses}
                href={!pageModel.isActive && '#'}
                onClick={(e) => {
                  if (!this.onClick) {
                    return;
                  }
                  this.onClick(e, pageModel.value);
                }}
                aria-disabled={pageModel.isActive && 'true'}
                aria-label={this.labelPrev}
              >
                <p-icon source='arrow-left-hair' />
              </a>
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
          const TagType = pageModel.isActive ? 'span' : 'a';
          const paginationGoToClasses = cx(
            prefix('pagination__goto'),
            pageModel.isActive && prefix('pagination__goto--current')
          );
          pageItems.push(
            <li {...pageModel} class={paginationItemClasses}>
              <TagType
                class={paginationGoToClasses}
                href='#'
                onClick={(e) => {
                  if (!this.onClick || pageModel.isActive) {
                    return;
                  }
                  this.onClick(e, pageModel.value);
                }}
                aria-label={`${this.labelPage} ${pageModel.value}`}
                aria-current={pageModel.isActive && 'page'}
              >
                {pageModel.value}
              </TagType>
            </li>
          );
        }
        if (pageModel.type === itemTypes.NEXT_PAGE_LINK) {
          const paginationNextClasses = cx(
            prefix('pagination__next'),
            pageModel.isActive && prefix('pagination__next--disabled')
          );

          return (nextItem = (
            <li {...pageModel} class={paginationItemClasses}>
              <a
                class={paginationNextClasses}
                href={!pageModel.isActive && '#'}
                onClick={(e) => {
                  if (!this.onClick) {
                    return;
                  }
                  this.onClick(e, pageModel.value);
                }}
                aria-disabled={pageModel.isActive && 'true'}
                aria-label={this.labelNext}
              >
                <p-icon source='arrow-right-hair' />
              </a>
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
      <nav class={paginationClasses} role='navigation' aria-label={this.label}>
        <ul class={paginationItemsClasses}>
          {paginationItems.prevItem}
          {paginationItems.pageItems}
          {paginationItems.nextItem}
        </ul>
      </nav>
    );
  }

  private onClick(event, page: number) {
    event.preventDefault();
    this.pClick.emit({ event, page });
  }
}
