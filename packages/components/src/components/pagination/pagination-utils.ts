/**
 * Universal pagination model generation algorithm
 *
 * The idea behind this module is to move the logic of creating pagination out of the component
 * and place it in a separate module.
 *
 * Adapted from ultimate-pagination
 * https://github.com/ultimate-pagination/ultimate-pagination
 */

/** @deprecated */
export const PAGINATION_NUMBER_OF_PAGE_LINKS = [5, 7] as const;
/** @deprecated */
export type PaginationMaxNumberOfPageLinks = (typeof PAGINATION_NUMBER_OF_PAGE_LINKS)[number];
export type PaginationUpdateEvent = { page: number; previousPage: number };

// TODO: first and last wording similar to carousel?
export type PaginationInternationalization = Partial<Record<'root' | 'prev' | 'next' | 'page', string>> | string; // string to support attribute, gets removed via InputParser

export type PaginationOptions = {
  activePage: number;
  pageTotal: number;
  showLastPage: boolean;
};

export type PaginationItem = {
  value?: number; // relevant for clickable elements
  isActive: boolean; // affects aria-disabled and aria-current
  isBeforeCurrent?: boolean;
  isBeforeBeforeCurrent?: boolean;
  isAfterCurrent?: boolean;
  isAfterAfterCurrent?: boolean;
  type: ItemType;
};

export enum ItemType {
  PAGE,
  ELLIPSIS,
  PREVIOUS,
  NEXT,
}

const ellipsisItem: PaginationItem = {
  type: ItemType.ELLIPSIS,
  isActive: false,
};

const createPreviousPageLink = (options: PaginationOptions): PaginationItem => {
  const { activePage } = options;

  return {
    type: ItemType.PREVIOUS,
    value: Math.max(1, activePage - 1),
    isActive: activePage > 1,
  };
};

const createNextPageLink = (options: PaginationOptions): PaginationItem => {
  const { activePage, pageTotal } = options;

  return {
    type: ItemType.NEXT,
    value: Math.min(pageTotal, activePage + 1),
    isActive: activePage < pageTotal,
  };
};

const createPageFunctionFactory = ({ activePage }: PaginationOptions): ((pageNumber: number) => PaginationItem) => {
  return (pageNumber): PaginationItem => ({
    type: ItemType.PAGE,
    value: pageNumber,
    isActive: pageNumber === activePage,
    isBeforeCurrent: pageNumber === activePage - 1,
    isBeforeBeforeCurrent: pageNumber === activePage - 2,
    isAfterCurrent: pageNumber === activePage + 1,
    isAfterAfterCurrent: pageNumber === activePage + 2,
  });
};

export const createRange = (start: number, end: number): number[] =>
  Array.from(Array(end - start + 1), (_, i) => i + start);

export const createPaginationItems = (options: PaginationOptions): PaginationItem[] => {
  const { pageTotal, activePage, showLastPage } = options;

  const pageRange = 1;
  const boundaryPagesRange = 1;
  const ellipsisSize = 1;
  const paginationItems: PaginationItem[] = [createPreviousPageLink(options)];
  const createPage = createPageFunctionFactory(options);

  // Simplify generation of pages if number of available items is equal or greater than total pages to show
  if (1 + 2 * ellipsisSize + 2 * boundaryPagesRange >= pageTotal) {
    const allPages = createRange(1, pageTotal).map(createPage);
    paginationItems.push(...allPages);
  } else {
    // Add first page
    paginationItems.push(createPage(1));

    // Calculate group of middle pages
    const middlePagesStart = Math.min(
      Math.max(activePage - pageRange, 2 + ellipsisSize),
      pageTotal - ellipsisSize - 2 - (showLastPage ? 1 : 0)
    );
    const middlePagesEnd = middlePagesStart + 2;
    const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);

    // Calculate and add ellipsis before group of middle pages
    const firstEllipsisPageNumber = middlePagesStart - 1;
    const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
    const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis ? createPage(firstEllipsisPageNumber) : ellipsisItem;

    if (showPageInsteadOfFirstEllipsis && pageTotal > 5) {
      paginationItems.push(ellipsisItem);
    }

    paginationItems.push(firstEllipsisOrPage);

    // Add group of middle pages
    paginationItems.push(...middlePages);

    // Calculate and add ellipsis after group of middle pages
    const lastEllipsisPageNumber = middlePagesEnd + 1;
    const showPageInsteadOfLastEllipsis = lastEllipsisPageNumber === pageTotal - (showLastPage ? 1 : 0);
    const lastEllipsisOrPage = showPageInsteadOfLastEllipsis ? createPage(lastEllipsisPageNumber) : ellipsisItem;
    paginationItems.push(lastEllipsisOrPage);

    if (showPageInsteadOfLastEllipsis && pageTotal > 5) {
      paginationItems.push(ellipsisItem);
    }

    // Add last page
    if (showLastPage) {
      paginationItems.push(createPage(pageTotal));
    }
  }

  paginationItems.push(createNextPageLink(options));
  return paginationItems;
};

export const getCurrentActivePage = (activePage: number, totalPages: number): number => {
  // Obviously we can't be on a negative or 0 page.
  if (activePage < 1) {
    activePage = 1;
  }

  // If the user has done something like /page/99999 we want to clamp that back down.
  if (activePage > totalPages) {
    activePage = totalPages;
  }

  return activePage;
};

export const getTotalPages = (totalItemsCount: number, itemsPerPage: number): number => {
  if (totalItemsCount < 1) {
    totalItemsCount = 1;
  }

  if (itemsPerPage < 1) {
    itemsPerPage = 1;
  }

  return Math.ceil(totalItemsCount / itemsPerPage);
};
