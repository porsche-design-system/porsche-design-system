'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const hasNamedSlot = require('./hasNamedSlot-c9552a6a.js');
const scrolling = require('./scrolling-9c4a1008.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const spacingStaticSmall = require('./spacingStaticSmall-267058b5.js');
const spacingStaticMedium = require('./spacingStaticMedium-b25f0b31.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const spacingStaticLarge = require('./spacingStaticLarge-e0ccb6f7.js');
const throwIfParentIsNotOfKind = require('./throwIfParentIsNotOfKind-d2c71eef.js');
const hasAttribute = require('./hasAttribute-cffeb74d.js');
const spacingStaticXSmall = require('./spacingStaticXSmall-0918e28c.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./has-document-f0620e06.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./isParentOfKind-9c1048fd.js');

const getAttribute = (el, attributeName) => {
  return el.getAttribute(attributeName);
};

const throwIfElementHasAttribute = (el, name) => {
  if (hasAttribute.hasAttribute(el, name)) {
    throw new Error(`Attribute '${name}' with the value '${getAttribute(el, name)}' needs to be set as property`);
  }
};

const { primaryColor: primaryColor$1 } = validateProps.getThemedColors('light');
const getComponentCss$6 = () => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: validateProps.addImportantToRule('block'),
      },
    },
    caption: {
      marginBottom: spacingStaticSmall.spacingStaticSmall,
      [validateProps.getMediaQueryMin('m')]: {
        marginBottom: spacingStaticMedium.spacingStaticMedium,
      },
    },
    root: {
      position: 'relative',
    },
    'scroll-area': Object.assign({ overflow: 'auto visible' }, validateProps.getFocusJssStyle({ offset: -1 })),
    table: Object.assign(Object.assign({ position: 'relative', width: '100%', display: 'table' }, textSmallStyle.textSmallStyle), { textAlign: 'left', color: primaryColor$1, whiteSpace: 'nowrap' }),
    'scroll-trigger': {
      position: 'absolute',
      top: 0,
      right: '1px',
      width: '1px',
      height: '1px',
      visibility: 'hidden',
    },
    'scroll-indicator': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      paddingLeft: spacingStaticLarge.spacingStaticLarge,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: validateProps.pxToRemWithUnit(48),
        pointerEvents: 'auto',
      },
    },
    'scroll-button': {
      padding: validateProps.pxToRemWithUnit(12),
      pointerEvents: 'auto',
    },
  });
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, Object.assign(Object.assign({}, validateProps.getBaseSlottedStyles()), { '& img': {
      verticalAlign: 'middle',
    } })));
};

const warnIfCaptionIsUndefined = (host, caption) => {
  if (!caption && !hasNamedSlot.hasNamedSlot(host, 'caption')) {
    console.warn(`Property "caption" of ${validateProps.getTagName(host)} needs to be provided to fulfill accessibility requirements, either as prop or named slot.`);
  }
};
const SORT_EVENT_NAME = 'internalSortingChange';

const propTypes$2 = {
  caption: validateProps.AllowedTypes.string,
};
const Table = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.sortingChange = validateProps.createEvent(this, "sortingChange", 3);
    this.initIntersectionObserver = () => {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting } of entries) {
          if (target === this.scrollTriggerElement) {
            this.isScrollIndicatorVisible = !isIntersecting;
          }
          else if (target === this.tableElement) {
            this.isScrollable = !isIntersecting;
          }
        }
      }, {
        root: this.scrollAreaElement,
        threshold: 1,
      });
      this.intersectionObserver.observe(this.scrollTriggerElement); // to check if table should show a scroll indicator
      this.intersectionObserver.observe(this.tableElement); // to check if table is scrollable in general
    };
    this.onScrollClick = () => {
      scrolling.scrollElementBy(this.scrollAreaElement, scrolling.getScrollByX(this.scrollAreaElement));
    };
    this.caption = undefined;
    this.isScrollIndicatorVisible = false;
    this.isScrollable = false;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
  }
  componentWillLoad() {
    warnIfCaptionIsUndefined(this.host, this.caption);
    this.host.shadowRoot.addEventListener(SORT_EVENT_NAME, (e) => {
      e.stopPropagation();
      this.sortingChange.emit(e.detail);
    });
  }
  componentDidLoad() {
    this.initIntersectionObserver();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.intersectionObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  render() {
    validateProps.validateProps(this, propTypes$2);
    validateProps.attachComponentCss(this.host, getComponentCss$6);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    const hasSlottedCaption = hasNamedSlot.hasNamedSlot(this.host, 'caption');
    const captionId = 'caption';
    const tableAttr = this.caption
      ? { 'aria-label': this.caption }
      : hasSlottedCaption && { 'aria-labelledby': captionId };
    const scrollAreaAttr = this.isScrollable && Object.assign(Object.assign({}, tableAttr), { role: 'region', tabindex: '0' });
    return (validateProps.h(validateProps.Host, null, hasSlottedCaption && (validateProps.h("div", { id: captionId, class: "caption" }, validateProps.h("slot", { name: "caption" }))), validateProps.h("div", { class: "root" }, validateProps.h("div", Object.assign({ class: "scroll-area" }, scrollAreaAttr, { ref: (el) => (this.scrollAreaElement = el) }), validateProps.h("div", Object.assign({ class: "table", role: "table" }, tableAttr, { ref: (el) => (this.tableElement = el) }), validateProps.h("slot", null), validateProps.h("span", { class: "scroll-trigger", ref: (el) => (this.scrollTriggerElement = el) }))), this.isScrollIndicatorVisible && (validateProps.h("div", { class: "scroll-indicator" }, validateProps.h(PrefixedTagNames.pButtonPure, { class: "scroll-button", "aria-hidden": "true", type: "button", tabIndex: -1, hideLabel: true, size: "inherit", icon: "arrow-head-right", onClick: this.onScrollClick }, "Next"))))));
  }
  get host() { return validateProps.getElement(this); }
};

const getComponentCss$5 = () => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: validateProps.addImportantToRule('table-row-group'),
      },
    },
  });
};

const TableBody = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-table');
  }
  render() {
    validateProps.attachComponentCss(this.host, getComponentCss$5);
    return (validateProps.h(validateProps.Host, { role: "rowgroup" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

const getComponentCss$4 = (multiline) => {
  return validateProps.getCss({
    '@global': {
      ':host': Object.assign(Object.assign({}, validateProps.addImportantToEachRule({
        display: 'table-cell',
        padding: validateProps.pxToRemWithUnit(12),
        margin: 0,
        borderBottom: `1px solid ${validateProps.getThemedColors('light').contrastLowColor}`,
        whiteSpace: multiline ? 'normal' : 'nowrap',
      })), { verticalAlign: 'middle' }),
    },
  });
};

const propTypes$1 = {
  multiline: validateProps.AllowedTypes.boolean,
};
const TableCell = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.multiline = false;
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-table-row');
  }
  render() {
    validateProps.validateProps(this, propTypes$1);
    validateProps.attachComponentCss(this.host, getComponentCss$4, this.multiline);
    return (validateProps.h(validateProps.Host, { role: "cell" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

const getComponentCss$3 = () => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: validateProps.addImportantToRule('table-header-group'),
      },
    },
  });
};

const TableHead = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-table');
  }
  render() {
    validateProps.attachComponentCss(this.host, getComponentCss$3);
    return (validateProps.h(validateProps.Host, { role: "rowgroup" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

const isDirectionAsc = (dir) => dir === 'asc';
const getAriaSort = (sort) => {
  return (sort === null || sort === void 0 ? void 0 : sort.active) ? (isDirectionAsc(sort.direction) ? 'ascending' : 'descending') : null;
};
const toggleDirection = (dir) => (isDirectionAsc(dir) ? 'desc' : 'asc');
const createSortedEventInitDictDetail = (sort) => ({
  bubbles: true,
  detail: Object.assign(Object.assign({}, sort), { active: true, direction: sort.active ? toggleDirection(sort.direction) : sort.direction }),
});
const isSortable = (active, direction) => {
  return active !== undefined && direction !== undefined;
};

const { contrastMediumColor, primaryColor } = validateProps.getThemedColors('light');
const { semiBold: fontWeightSemiBold } = validateProps.fontWeight;
const getComponentCss$2 = (active, direction, hideLabel, multiline) => {
  const sortable = isSortable(active, direction);
  return validateProps.getCss(Object.assign({ '@global': Object.assign({ ':host': validateProps.addImportantToEachRule({
        display: 'table-cell',
        padding: `${validateProps.pxToRemWithUnit(2)} ${validateProps.pxToRemWithUnit(12)} ${validateProps.pxToRemWithUnit(8)}`,
        borderBottom: `1px solid ${contrastMediumColor}`,
        verticalAlign: 'bottom',
        fontWeight: fontWeightSemiBold,
        whiteSpace: multiline ? 'normal' : 'nowrap',
      }) }, (sortable
      ? {
        button: Object.assign(Object.assign(Object.assign(Object.assign({ display: 'flex', alignItems: 'flex-end', padding: 0, boxSizing: 'border-box', appearance: 'none', border: 'none' }, textSmallStyle.textSmallStyle), { fontWeight: fontWeightSemiBold, color: primaryColor, textDecoration: 'none', textAlign: 'left', background: 'transparent', cursor: 'pointer' }), validateProps.getFocusJssStyle({ offset: 1 })), validateProps.hoverMediaQuery(Object.assign(Object.assign({}, validateProps.getHoverJssStyle()), { '&:hover, &:focus': {
            '& .icon': {
              opacity: 1,
            },
          } }))),
      }
      : hideLabel && {
        span: Object.assign(Object.assign({}, validateProps.getTextHiddenJssStyle(true)), { display: 'block', border: 0 }),
      })) }, (sortable && {
    icon: {
      marginLeft: spacingStaticXSmall.spacingStaticXSmall,
      opacity: active ? 1 : 0,
      transform: `rotate3d(0,0,1,${isDirectionAsc(direction) ? 0 : 180}deg)`,
      transformOrigin: '50% 50%', // for iOS
    },
  })));
};

const propTypes = {
  sort: validateProps.AllowedTypes.shape({
    id: validateProps.AllowedTypes.string,
    active: validateProps.AllowedTypes.boolean,
    direction: validateProps.AllowedTypes.oneOf(['asc', 'desc', undefined]),
  }),
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  multiline: validateProps.AllowedTypes.boolean,
};
const TableHeadCell = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.onButtonClick = () => {
      this.host.dispatchEvent(new CustomEvent(SORT_EVENT_NAME, createSortedEventInitDictDetail(this.sort)));
    };
    this.sort = undefined;
    this.hideLabel = false;
    this.multiline = false;
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-table-head-row');
    throwIfElementHasAttribute(this.host, 'sort');
  }
  render() {
    validateProps.validateProps(this, propTypes);
    const { active, direction } = this.sort || {};
    validateProps.attachComponentCss(this.host, getComponentCss$2, active, direction, this.hideLabel, this.multiline);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, { scope: "col", role: "columnheader", "aria-sort": getAriaSort(this.sort) }, isSortable(active, direction) ? (validateProps.h("button", { type: "button", onClick: this.onButtonClick }, validateProps.h("slot", null), validateProps.h(PrefixedTagNames.pIcon, { class: "icon", color: "inherit", name: "arrow-up", "aria-hidden": "true" }))) : (validateProps.h("span", null, validateProps.h("slot", null)))));
  }
  get host() { return validateProps.getElement(this); }
};

const getComponentCss$1 = () => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: validateProps.addImportantToRule('table-row'),
      },
    },
  });
};

const TableHeadRow = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-table-head');
  }
  render() {
    validateProps.attachComponentCss(this.host, getComponentCss$1);
    return (validateProps.h(validateProps.Host, { role: "row" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

const getComponentCss = () => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule(Object.assign({ display: 'table-row', transition: validateProps.getTransition('background-color') }, validateProps.hoverMediaQuery({
        '&(:hover)': {
          backgroundColor: validateProps.getThemedColors('light').backgroundSurfaceColor,
        },
      }))),
    },
  });
};

const TableRow = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-table-body');
  }
  render() {
    validateProps.attachComponentCss(this.host, getComponentCss);
    return (validateProps.h(validateProps.Host, { role: "row" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_table = Table;
exports.p_table_body = TableBody;
exports.p_table_cell = TableCell;
exports.p_table_head = TableHead;
exports.p_table_head_cell = TableHeadCell;
exports.p_table_head_row = TableHeadRow;
exports.p_table_row = TableRow;
