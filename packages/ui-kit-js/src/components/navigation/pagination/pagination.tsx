import { JSX, Component, Event, EventEmitter, Prop, h } from "@stencil/core";
import cx from "classnames";
import { prefix } from "../../../utils/prefix";
import {
  getTotalPages,
  getCurrentActivePage,
  createPaginationModel,
  PaginationModelItem,
  itemTypes,
  PaginationItemType
} from "./pagination-helper";

@Component({
  tag: "p-pagination",
  styleUrl: "pagination.scss",
  shadow: true
})
export class Pagination {
  /** @internal Type of the pagination item. */
  @Prop() type: PaginationItemType;

  /** The total count of items. */
  @Prop() totalItemsCount: number;

  /** The total count of items which should be shown per page.  */
  @Prop() itemsPerPage: number;

  /** Index of the currently active page. */
  @Prop() activePage?: number = 1;

  /** The number of pages between ellipsis. 0 = mobile | 1 = desktop */
  @Prop() pageRange?: 0 | 1 = 1;

  /** Aria label what the pagination is used for. */
  @Prop() label?: string = "Pagination";

  /** Aria label for previous page icon. */
  @Prop() labelPrev?: string = "Previous page";

  /** Aria label for page navigation. */
  @Prop() labelPage?: string = "Page";

  /** Aria label for next page icon. */
  @Prop() labelNext?: string = "Next page";

  /** Adapts the color when used on dark background. */
  @Prop() theme?: "light" | "dark" = "light";

  /** Emitted when the link is clicked. */
  @Event() pClick!: EventEmitter;

  private onClick(event, page: number) {
    event.preventDefault();
    this.pClick.emit({ event, page });
  }

  render(): JSX.Element {
    const paginationClasses = cx(prefix("pagination"), this.theme === "dark" && prefix("pagination--theme-dark"));
    const paginationItemsClasses = cx(prefix("pagination__items"));
    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const activePage = getCurrentActivePage(this.activePage, pageTotal);
    const pageRange = this.pageRange;

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

      const paginationItemClasses = cx(prefix("pagination__item"));

      paginationModel.forEach((pageModel: PaginationModelItem) => {
        if (pageModel.type === itemTypes.PREVIOUS_PAGE_LINK) {
          const paginationPrevClasses = cx(
            prefix("pagination__prev"),
            pageModel.isActive && prefix("pagination__prev--disabled")
          );

          return (prevItem = (
            <li class={paginationItemClasses}>
              <a
                class={paginationPrevClasses}
                href="#"
                onClick={(e) => {
                  if (!this.onClick) {
                    return;
                  }
                  this.onClick(e, pageModel.value);
                }}
                aria-disabled={pageModel.isActive && "true"}
                aria-label={this.labelPrev}
              >
                <p-icon source="arrow-left-hair" />
              </a>
            </li>
          ));
        }
        if (pageModel.type === itemTypes.ELLIPSIS) {
          const paginationGoToClasses = cx(prefix("pagination__goto"), prefix("pagination__goto--ellipsis"));
          pageItems.push(
            <li {...pageModel} class={paginationItemClasses}>
              <span class={paginationGoToClasses} />
            </li>
          );
        }
        if (pageModel.type === itemTypes.PAGE) {
          const TagType = pageModel.isActive ? "span" : "a";
          const paginationGoToClasses = cx(
            prefix("pagination__goto"),
            pageModel.isActive && prefix("pagination__goto--current")
          );
          pageItems.push(
            <li {...pageModel} class={paginationItemClasses}>
              <TagType
                class={paginationGoToClasses}
                href="#"
                onClick={(e) => {
                  if (!this.onClick || pageModel.isActive) {
                    return;
                  }
                  this.onClick(e, pageModel.value);
                }}
                aria-label={`${this.labelPage} ${pageModel.value}`}
                aria-current={pageModel.isActive && "page"}
              >
                {pageModel.value}
              </TagType>
            </li>
          );
        }
        if (pageModel.type === itemTypes.NEXT_PAGE_LINK) {
          const paginationNextClasses = cx(
            prefix("pagination__next"),
            pageModel.isActive && prefix("pagination__next--disabled")
          );

          return (nextItem = (
            <li class={paginationItemClasses}>
              <a
                class={paginationNextClasses}
                href={!pageModel.isActive && "#"}
                onClick={(e) => {
                  if (!this.onClick) {
                    return;
                  }
                  this.onClick(e, pageModel.value);
                }}
                aria-disabled={pageModel.isActive && "true"}
                aria-label={this.labelNext}
              >
                <p-icon source="arrow-right-hair" />
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
      <nav class={paginationClasses} role="navigation" aria-label={this.label}>
        <ul class={paginationItemsClasses}>
          {paginationItems.prevItem}
          {paginationItems.pageItems}
          {paginationItems.nextItem}
        </ul>
      </nav>
    );
  }
}
