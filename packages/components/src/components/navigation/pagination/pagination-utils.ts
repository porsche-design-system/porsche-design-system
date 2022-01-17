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

export type NumberOfPageLinks = 5 | 7;
export type PageChangeEvent = { page: number; previousPage: number };

export type PageItemType = 'PAGE';
export type EllipsisItemType = 'ELLIPSIS';
export type PreviousPageLinkItemType = 'PREVIOUS_PAGE_LINK';
export type NextPageLinkItemType = 'NEXT_PAGE_LINK';
export type PaginationItemType = PageItemType | EllipsisItemType | PreviousPageLinkItemType | NextPageLinkItemType;

export type ItemTypes = {
  PAGE: PageItemType;
  ELLIPSIS: EllipsisItemType;
  PREVIOUS_PAGE_LINK: PreviousPageLinkItemType;
  NEXT_PAGE_LINK: NextPageLinkItemType;
};

export type ItemKeys = {
  [type: string]: number;
  FIRST_ELLIPSIS: number;
  SECOND_ELLIPSIS: number;
  PREVIOUS_PAGE_LINK: number;
  NEXT_PAGE_LINK: number;
};

export type PaginationModelOptions = {
  activePage: number;
  pageTotal: number;
  pageRange: number;
};

export type PaginationModelItem = {
  key: number; // TODO: unused?
  value: number;
  isActive: boolean;
  type: PaginationItemType;
};

// TODO: create enum
export const itemTypes: ItemTypes = {
  PAGE: 'PAGE',
  ELLIPSIS: 'ELLIPSIS',
  PREVIOUS_PAGE_LINK: 'PREVIOUS_PAGE_LINK',
  NEXT_PAGE_LINK: 'NEXT_PAGE_LINK',
};

// TODO: unused?
const itemKeys: ItemKeys = {
  FIRST_ELLIPSIS: -1,
  SECOND_ELLIPSIS: -2,
  PREVIOUS_PAGE_LINK: -4,
  NEXT_PAGE_LINK: -5,
};

// TODO: merge factories
const createFirstEllipsis = (pageNumber: number): PaginationModelItem => ({
  type: itemTypes.ELLIPSIS,
  key: itemKeys.FIRST_ELLIPSIS,
  value: pageNumber,
  isActive: false,
});

const createSecondEllipsis = (pageNumber: number): PaginationModelItem => ({
  type: itemTypes.ELLIPSIS,
  key: itemKeys.SECOND_ELLIPSIS,
  value: pageNumber,
  isActive: false,
});

const createPreviousPageLink = (options: PaginationModelOptions): PaginationModelItem => {
  const { activePage } = options;

  return {
    type: itemTypes.PREVIOUS_PAGE_LINK,
    key: itemKeys.PREVIOUS_PAGE_LINK,
    value: Math.max(1, activePage - 1),
    isActive: activePage > 1,
  };
};

const createNextPageLink = (options: PaginationModelOptions): PaginationModelItem => {
  const { activePage, pageTotal } = options;

  return {
    type: itemTypes.NEXT_PAGE_LINK,
    key: itemKeys.NEXT_PAGE_LINK,
    value: Math.min(pageTotal, activePage + 1),
    isActive: activePage < pageTotal,
  };
};

const createPageFunctionFactory = (options: PaginationModelOptions): ((pageNumber: number) => PaginationModelItem) => {
  const { activePage } = options;

  return (pageNumber): PaginationModelItem => ({
    type: itemTypes.PAGE,
    key: pageNumber,
    value: pageNumber,
    isActive: pageNumber === activePage,
  });
};

export const createRange = (start: number, end: number): number[] =>
  Array.from(Array(end - start + 1)).map((_, i) => i + start);

export const createPaginationModel = (options: PaginationModelOptions): PaginationModelItem[] => {
  // exception tests
  if (options == null) {
    throw new Error('createPaginationModel(): options object should be a passed');
  }

  const { pageTotal, activePage, pageRange } = options;

  const boundaryPagesRange = 1;
  const ellipsisSize = 1;
  const paginationModel: PaginationModelItem[] = [];
  const createPage = createPageFunctionFactory(options);

  paginationModel.push(createPreviousPageLink(options));

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
    const lastPagesEnd = pageTotal;
    const lastPages = createRange(lastPagesStart, lastPagesEnd).map(createPage);

    // Calculate group of main pages
    const mainPagesStart = Math.min(
      Math.max(activePage - pageRange, firstPagesEnd + ellipsisSize + 1),
      lastPagesStart - ellipsisSize - 2 * pageRange - 1
    );
    const mainPagesEnd = mainPagesStart + 2 * pageRange;
    const mainPages = createRange(mainPagesStart, mainPagesEnd).map(createPage);

    // Add group of first pages
    paginationModel.push(...firstPages);

    // Calculate and add ellipsis before group of main pages
    const firstEllipsisPageNumber = mainPagesStart - 1;
    const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === firstPagesEnd + 1;
    const createFirstEllipsisOrPage = showPageInsteadOfFirstEllipsis ? createPage : createFirstEllipsis;
    const firstEllipsis = createFirstEllipsisOrPage(firstEllipsisPageNumber);
    paginationModel.push(firstEllipsis);

    // Add group of main pages
    paginationModel.push(...mainPages);

    // Calculate and add ellipsis after group of main pages
    const secondEllipsisPageNumber = mainPagesEnd + 1;
    const showPageInsteadOfSecondEllipsis = secondEllipsisPageNumber === lastPagesStart - 1;
    const createSecondEllipsisOrPage = showPageInsteadOfSecondEllipsis ? createPage : createSecondEllipsis;
    const secondEllipsis = createSecondEllipsisOrPage(secondEllipsisPageNumber);
    paginationModel.push(secondEllipsis);

    // Add group of last pages
    paginationModel.push(...lastPages);
  }

  paginationModel.push(createNextPageLink(options));

  return paginationModel;
};

export const getCurrentActivePage = (activePage: number, totalPages: number): number => {
  // exception tests
  if (activePage === undefined || totalPages === undefined) {
    throw new Error('getCurrentActivePage(): activePage and totalPages props must be provided');
  }

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
  // exception test
  if (totalItemsCount === undefined || itemsPerPage === undefined) {
    throw new Error('getTotalPages(): totalItemsCount and itemsPerPage props must be provided');
  }

  if (totalItemsCount < 1) {
    totalItemsCount = 1;
  }

  if (itemsPerPage < 1) {
    itemsPerPage = 1;
  }

  return Math.ceil(totalItemsCount / itemsPerPage);
};

export const getCounterResetValue = (element: Element): number => {
  const computedStyles = getComputedStyle(element);
  const [, value] = computedStyles.getPropertyValue('counter-reset').split(' ');
  return parseInt(value, 10);
};
