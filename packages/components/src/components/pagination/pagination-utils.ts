/**
 * Universal pagination model generation algorithm
 *
 * The idea behind this module is to move the logic of creating pagination out of the component
 * and place it in a separate module.
 *
 * Adapted from ultimate-pagination
 * https://github.com/ultimate-pagination/ultimate-pagination
 */

export const PAGINATION_NUMBER_OF_PAGE_LINKS = [5, 7] as const;
export type PaginationMaxNumberOfPageLinks = (typeof PAGINATION_NUMBER_OF_PAGE_LINKS)[number];
export type PaginationUpdateEvent = { page: number; previousPage: number };

// TODO: first and last wording similar to carousel?
export type PaginationInternationalization = Partial<Record<'root' | 'prev' | 'next' | 'page', string>> | string; // string to support attribute, gets removed via InputParser

export type PaginationOptions = {
  activePage: number;
  pageTotal: number;
  pageRange: number;
  showLastPage: boolean;
};

export type PaginationItem = {
  value?: number; // relevant for clickable elements
  isActive: boolean; // affects aria-disabled and aria-current
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

const createPageFunctionFactory = (options: PaginationOptions): ((pageNumber: number) => PaginationItem) => {
  return (pageNumber): PaginationItem => ({
    type: ItemType.PAGE,
    value: pageNumber,
    isActive: pageNumber === options.activePage,
  });
};

export const createRange = (start: number, end: number): number[] =>
  Array.from(Array(end - start + 1), (_, i) => i + start);

export const createPaginationModel = (options: PaginationOptions): PaginationItem[] => {
  const { pageTotal, activePage, pageRange, showLastPage } = options;

  const boundaryPagesRange = 1;
  const ellipsisSize = 1;
  const paginationModel: PaginationItem[] = [createPreviousPageLink(options)];
  const createPage = createPageFunctionFactory(options);

  // Simplify generation of pages if number of available items is equal or greater than total pages to show
  if (1 + 2 * ellipsisSize + 2 * pageRange + 2 * boundaryPagesRange >= pageTotal) {
    const allPages = createRange(1, pageTotal).map(createPage);
    paginationModel.push(...allPages);
  } else {
    // Add first page
    paginationModel.push(createPage(1));

    // Calculate group of middle pages
    const middlePagesStart = Math.min(
      Math.max(activePage - pageRange, 2 + ellipsisSize),
      pageTotal - ellipsisSize - 2 * pageRange - (showLastPage ? 1 : 0)
    );
    const middlePagesEnd = middlePagesStart + 2 * pageRange;
    const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);

    // Calculate and add ellipsis before group of middle pages
    const firstEllipsisPageNumber = middlePagesStart - 1;
    const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
    const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis ? createPage(firstEllipsisPageNumber) : ellipsisItem;
    paginationModel.push(firstEllipsisOrPage);

    // Add group of middle pages
    paginationModel.push(...middlePages);

    // Calculate and add ellipsis after group of middle pages
    const lastEllipsisPageNumber = middlePagesEnd + 1;
    const showPageInsteadOfLastEllipsis = lastEllipsisPageNumber === pageTotal - (showLastPage ? 1 : 0);
    const lastEllipsisOrPage = showPageInsteadOfLastEllipsis ? createPage(lastEllipsisPageNumber) : ellipsisItem;
    paginationModel.push(lastEllipsisOrPage);

    // Add last page
    if (showLastPage) {
      paginationModel.push(createPage(pageTotal));
    }
  }

  paginationModel.push(createNextPageLink(options));

  return paginationModel;
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

// TODO: change this to a non js solution to support SSR
export const getCounterResetValue = (element: Element): PaginationMaxNumberOfPageLinks => {
  const [, value] = getComputedStyle(element).counterReset.split(' ');
  return parseInt(value, 10) as PaginationMaxNumberOfPageLinks;
};
