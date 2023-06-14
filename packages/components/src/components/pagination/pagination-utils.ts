/**
 * Universal pagination model generation algorithm
 *
 * The idea behind this module is to move the logic of creating pagination out of the component
 * and place it in a separate module.
 *
 * Adapted from ultimate-pagination
 * https://github.com/ultimate-pagination/ultimate-pagination
 *
 */

export const PAGINATION_NUMBER_OF_PAGE_LINKS = [5, 7] as const;
export type PaginationMaxNumberOfPageLinks = (typeof PAGINATION_NUMBER_OF_PAGE_LINKS)[number];
export type PaginationUpdateEvent = { page: number; previousPage: number };

// TODO: first and last wording similar to carousel?
export type PaginationInternationalization = Partial<Record<'root' | 'prev' | 'next' | 'page', string>> | string; // string to support attribute, gets removed via InputParser

export type PageItemType = 'PAGE';
export type EllipsisItemType = 'ELLIPSIS';
export type PreviousPageLinkItemType = 'PREVIOUS_PAGE_LINK';
export type NextPageLinkItemType = 'NEXT_PAGE_LINK';
export type PaginationItemType = PageItemType | EllipsisItemType | PreviousPageLinkItemType | NextPageLinkItemType;

export type PaginationOptions = {
  activePage: number;
  pageTotal: number;
  pageRange: number;
};

export type PaginationItem = {
  value: number;
  isActive: boolean;
  type: PaginationItemType;
};

// TODO: create enum?
export const itemTypes: {
  PAGE: PageItemType;
  ELLIPSIS: EllipsisItemType;
  PREVIOUS_PAGE_LINK: PreviousPageLinkItemType;
  NEXT_PAGE_LINK: NextPageLinkItemType;
} = {
  PAGE: 'PAGE',
  ELLIPSIS: 'ELLIPSIS',
  PREVIOUS_PAGE_LINK: 'PREVIOUS_PAGE_LINK',
  NEXT_PAGE_LINK: 'NEXT_PAGE_LINK',
};

// TODO: merge factories
const createFirstEllipsis = (pageNumber: number): PaginationItem => ({
  type: itemTypes.ELLIPSIS,
  value: pageNumber,
  isActive: false,
});

const createLastEllipsis = (pageNumber: number): PaginationItem => ({
  type: itemTypes.ELLIPSIS,
  value: pageNumber,
  isActive: false,
});

const createPreviousPageLink = (options: PaginationOptions): PaginationItem => {
  const { activePage } = options;

  return {
    type: itemTypes.PREVIOUS_PAGE_LINK,
    value: Math.max(1, activePage - 1),
    isActive: activePage > 1,
  };
};

const createNextPageLink = (options: PaginationOptions): PaginationItem => {
  const { activePage, pageTotal } = options;

  return {
    type: itemTypes.NEXT_PAGE_LINK,
    value: Math.min(pageTotal, activePage + 1),
    isActive: activePage < pageTotal,
  };
};

const createPageFunctionFactory = (options: PaginationOptions): ((pageNumber: number) => PaginationItem) => {
  return (pageNumber): PaginationItem => ({
    type: itemTypes.PAGE,
    value: pageNumber,
    isActive: pageNumber === options.activePage,
  });
};

export const createRange = (start: number, end: number): number[] =>
  Array.from(Array(end - start + 1)).map((_, i) => i + start);

export const createPaginationModel = (options: PaginationOptions): PaginationItem[] => {
  const { pageTotal, activePage, pageRange } = options;

  const boundaryPagesRange = 1;
  const ellipsisSize = 1;
  const paginationModel: PaginationItem[] = [createPreviousPageLink(options)];
  const createPage = createPageFunctionFactory(options);

  // Simplify generation of pages if number of available items is equal or greater than total pages to show
  if (1 + 2 * ellipsisSize + 2 * pageRange + 2 * boundaryPagesRange >= pageTotal) {
    const allPages = createRange(1, pageTotal).map(createPage);
    paginationModel.push(...allPages);
  } else {
    // Calculate group of first pages
    const firstPagesStart = 1;
    const firstPagesEnd = boundaryPagesRange;
    const firstPages = createRange(firstPagesStart, firstPagesEnd).map(createPage);

    // Calculate group of last pages
    const lastPagesStart = pageTotal + 1 - boundaryPagesRange;
    const lastPages = createRange(lastPagesStart, pageTotal).map(createPage);

    // Calculate group of middle pages
    const middlePagesStart = Math.min(
      Math.max(activePage - pageRange, firstPagesEnd + ellipsisSize + 1),
      lastPagesStart - ellipsisSize - 2 * pageRange - 1
    );
    const middlePagesEnd = middlePagesStart + 2 * pageRange;
    const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);

    // Add group of first pages
    paginationModel.push(...firstPages);

    // Calculate and add ellipsis before group of middle pages
    const firstEllipsisPageNumber = middlePagesStart - 1;
    const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === firstPagesEnd + 1;
    const createFirstEllipsisOrPage = showPageInsteadOfFirstEllipsis ? createPage : createFirstEllipsis;
    const firstEllipsisOrPage = createFirstEllipsisOrPage(firstEllipsisPageNumber);
    paginationModel.push(firstEllipsisOrPage);

    // Add group of middle pages
    paginationModel.push(...middlePages);

    // Calculate and add ellipsis after group of middle pages
    const lastEllipsisPageNumber = middlePagesEnd + 1;
    const showPageInsteadOfLastEllipsis = lastEllipsisPageNumber === lastPagesStart - 1;
    const createLastEllipsisOrPage = showPageInsteadOfLastEllipsis ? createPage : createLastEllipsis;
    const lastEllipsisOrPage = createLastEllipsisOrPage(lastEllipsisPageNumber);
    paginationModel.push(lastEllipsisOrPage);

    // Add group of last pages
    paginationModel.push(...lastPages);
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
  const computedStyles = getComputedStyle(element);
  const [, value] = computedStyles.getPropertyValue('counter-reset').split(' ');
  return parseInt(value, 10) as PaginationMaxNumberOfPageLinks;
};
