'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const theme = require('./theme-25a5ded7.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');

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
const PAGINATION_NUMBER_OF_PAGE_LINKS = [5, 7];
// TODO: create enum
const itemTypes = {
  PAGE: 'PAGE',
  ELLIPSIS: 'ELLIPSIS',
  PREVIOUS_PAGE_LINK: 'PREVIOUS_PAGE_LINK',
  NEXT_PAGE_LINK: 'NEXT_PAGE_LINK',
};
// TODO: unused?
const itemKeys = {
  FIRST_ELLIPSIS: -1,
  SECOND_ELLIPSIS: -2,
  PREVIOUS_PAGE_LINK: -4,
  NEXT_PAGE_LINK: -5,
};
// TODO: merge factories
const createFirstEllipsis = (pageNumber) => ({
  type: itemTypes.ELLIPSIS,
  key: itemKeys.FIRST_ELLIPSIS,
  value: pageNumber,
  isActive: false,
});
const createSecondEllipsis = (pageNumber) => ({
  type: itemTypes.ELLIPSIS,
  key: itemKeys.SECOND_ELLIPSIS,
  value: pageNumber,
  isActive: false,
});
const createPreviousPageLink = (options) => {
  const { activePage } = options;
  return {
    type: itemTypes.PREVIOUS_PAGE_LINK,
    key: itemKeys.PREVIOUS_PAGE_LINK,
    value: Math.max(1, activePage - 1),
    isActive: activePage > 1,
  };
};
const createNextPageLink = (options) => {
  const { activePage, pageTotal } = options;
  return {
    type: itemTypes.NEXT_PAGE_LINK,
    key: itemKeys.NEXT_PAGE_LINK,
    value: Math.min(pageTotal, activePage + 1),
    isActive: activePage < pageTotal,
  };
};
const createPageFunctionFactory = (options) => {
  const { activePage } = options;
  return (pageNumber) => ({
    type: itemTypes.PAGE,
    key: pageNumber,
    value: pageNumber,
    isActive: pageNumber === activePage,
  });
};
const createRange = (start, end) => Array.from(Array(end - start + 1)).map((_, i) => i + start);
const createPaginationModel = (options) => {
  // exception tests
  if (options == null) {
    throw new Error('createPaginationModel(): options object should be a passed');
  }
  const { pageTotal, activePage, pageRange } = options;
  const boundaryPagesRange = 1;
  const ellipsisSize = 1;
  const paginationModel = [];
  const createPage = createPageFunctionFactory(options);
  paginationModel.push(createPreviousPageLink(options));
  // Simplify generation of pages if number of available items is equal or greater than total pages to show
  if (1 + 2 * ellipsisSize + 2 * pageRange + 2 * boundaryPagesRange >= pageTotal) {
    const allPages = createRange(1, pageTotal).map(createPage);
    paginationModel.push(...allPages);
  }
  else {
    // Calculate group of first pages
    const firstPagesStart = 1;
    const firstPagesEnd = boundaryPagesRange;
    const firstPages = createRange(firstPagesStart, firstPagesEnd).map(createPage);
    // Calculate group of last pages
    const lastPagesStart = pageTotal + 1 - boundaryPagesRange;
    const lastPagesEnd = pageTotal;
    const lastPages = createRange(lastPagesStart, lastPagesEnd).map(createPage);
    // Calculate group of main pages
    const mainPagesStart = Math.min(Math.max(activePage - pageRange, firstPagesEnd + ellipsisSize + 1), lastPagesStart - ellipsisSize - 2 * pageRange - 1);
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
const getCurrentActivePage = (activePage, totalPages) => {
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
const getTotalPages = (totalItemsCount, itemsPerPage) => {
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
const getCounterResetValue = (element) => {
  const computedStyles = getComputedStyle(element);
  const [, value] = computedStyles.getPropertyValue('counter-reset').split(' ');
  return parseInt(value, 10);
};

const listeners = new Map();
const onResize = validateProps.throttle(500, () => {
  listeners.forEach((callback) => {
    callback();
  });
});
const attachListenerIfNeeded = () => {
  if (listeners.size === 1) {
    window.addEventListener('resize', onResize);
  }
};
const removeListenerIfNotNeededAnymore = () => {
  if (listeners.size < 1) {
    window.removeEventListener('resize', onResize);
  }
};
// TODO: use ResizeObserver, https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
const listenResize = (callback) => {
  const token = {};
  listeners.set(token, callback);
  attachListenerIfNeeded();
  return () => {
    listeners.delete(token);
    removeListenerIfNotNeededAnymore();
  };
};

const getComponentCss = (maxNumberOfPageLinks, theme) => {
  const { primaryColor, disabledColor, hoverColor, activeColor, focusColor } = validateProps.getThemedColors(theme);
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
        outline: validateProps.addImportantToRule(0),
      },
      nav: Object.assign({ display: 'flex', justifyContent: 'center', margin: 0, padding: 0 }, validateProps.buildResponsiveStyles(maxNumberOfPageLinks, (n) => ({
        counterReset: `size ${n}`,
      }))),
      ul: {
        display: 'flex',
        margin: 0,
        padding: 0,
      },
      li: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      },
      span: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ display: 'flex', justifyContent: 'center', alignItems: 'center', transition: validateProps.getTransition('color'), position: 'relative', width: validateProps.pxToRemWithUnit(40), height: validateProps.pxToRemWithUnit(40), boxSizing: 'border-box', textDecoration: 'none' }, textSmallStyle.textSmallStyle), { whiteSpace: 'nowrap', cursor: 'pointer', color: primaryColor }), validateProps.getFocusJssStyle({ color: focusColor, offset: 1 })), validateProps.hoverMediaQuery({
        '&:hover': {
          color: hoverColor,
        },
      })), { '&:active': {
          outline: 'none',
          color: activeColor,
        }, '&[aria-disabled]': {
          cursor: 'default',
          pointerEvents: 'none',
          color: disabledColor,
        }, '&[aria-current]': Object.assign(Object.assign({ cursor: 'default' }, validateProps.hoverMediaQuery({
          '&:hover': {
            color: primaryColor,
          },
        })), { '&::after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: 0,
            left: validateProps.pxToRemWithUnit(6),
            right: validateProps.pxToRemWithUnit(6),
            height: validateProps.pxToRemWithUnit(4),
            background: primaryColor,
          } }) }),
    },
    ellipsis: {
      cursor: 'default',
      pointerEvents: 'none',
      '&::after': {
        content: '"…"',
      },
    },
  });
};

const propTypes = {
  totalItemsCount: validateProps.AllowedTypes.number,
  itemsPerPage: validateProps.AllowedTypes.number,
  activePage: validateProps.AllowedTypes.number,
  maxNumberOfPageLinks: validateProps.AllowedTypes.breakpoint(PAGINATION_NUMBER_OF_PAGE_LINKS),
  allyLabel: validateProps.AllowedTypes.string,
  allyLabelPrev: validateProps.AllowedTypes.string,
  allyLabelPage: validateProps.AllowedTypes.string,
  allyLabelNext: validateProps.AllowedTypes.string,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Pagination = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.pageChange = validateProps.createEvent(this, "pageChange", 3);
    this.updateMaxNumberOfPageLinks = () => {
      this.breakpointMaxNumberOfPageLinks = getCounterResetValue(this.navigationElement);
    };
    this.totalItemsCount = 1;
    this.itemsPerPage = 1;
    this.activePage = 1;
    this.maxNumberOfPageLinks = {
      base: 5,
      xs: 7,
    };
    this.allyLabel = 'Pagination';
    this.allyLabelPrev = 'Previous page';
    this.allyLabelPage = 'Page';
    this.allyLabelNext = 'Next page';
    this.theme = 'light';
    this.breakpointMaxNumberOfPageLinks = undefined;
  }
  componentDidLoad() {
    this.unlistenResize = listenResize(this.updateMaxNumberOfPageLinks);
    this.updateMaxNumberOfPageLinks(); // TODO: this causes initial rerender
  }
  disconnectedCallback() {
    if (this.unlistenResize) {
      this.unlistenResize();
    }
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.maxNumberOfPageLinks, this.theme);
    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const paginationModel = createPaginationModel({
      activePage: getCurrentActivePage(this.activePage, pageTotal),
      pageTotal,
      pageRange: this.breakpointMaxNumberOfPageLinks === 7 ? 1 : 0,
    });
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h("nav", { role: "navigation", "aria-label": this.allyLabel, ref: (el) => (this.navigationElement = el) }, validateProps.h("ul", null, paginationModel.map((pageModel) => {
      const { type, isActive, value } = pageModel;
      const spanProps = {
        role: 'button',
        onClick: () => this.onClick(value),
        onKeyDown: (e) => this.onKeyDown(e, value),
      };
      switch (type) {
        case itemTypes.PREVIOUS_PAGE_LINK:
          return (validateProps.h("li", { key: "prev" }, validateProps.h("span", Object.assign({}, spanProps, { tabIndex: isActive ? 0 : null, "aria-disabled": !isActive ? 'true' : null, "aria-label": this.allyLabelPrev }), validateProps.h(PrefixedTagNames.pIcon, { name: "arrow-head-left", color: "inherit", "aria-hidden": "true" }))));
        case itemTypes.ELLIPSIS:
          return (validateProps.h("li", { key: "ellipsis" }, validateProps.h("span", { class: "ellipsis" })));
        case itemTypes.PAGE:
          return (validateProps.h("li", { key: value }, validateProps.h("span", Object.assign({}, spanProps, { tabIndex: 0, "aria-label": `${this.allyLabelPage} ${value}`, "aria-current": isActive ? 'page' : null }), value)));
        case itemTypes.NEXT_PAGE_LINK:
          return (validateProps.h("li", { key: "next" }, validateProps.h("span", Object.assign({}, spanProps, { tabIndex: isActive ? 0 : null, "aria-disabled": !isActive ? 'true' : null, "aria-label": this.allyLabelNext }), validateProps.h(PrefixedTagNames.pIcon, { name: "arrow-head-right", color: "inherit", "aria-hidden": "true" }))));
      }
    }))));
  }
  onKeyDown(event, page) {
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
  onClick(page) {
    if (page !== this.activePage) {
      this.pageChange.emit({ page, previousPage: this.activePage });
      this.activePage = page; // TODO: should become a controlled component
    }
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_pagination = Pagination;
