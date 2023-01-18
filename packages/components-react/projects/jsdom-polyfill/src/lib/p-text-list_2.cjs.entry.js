'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getDataThemeDarkAttribute = require('./getDataThemeDarkAttribute-3ea7a73c.js');
const theme = require('./theme-25a5ded7.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const throwIfParentIsNotOfKind = require('./throwIfParentIsNotOfKind-d2c71eef.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./isParentOfKind-9c1048fd.js');

const LIST_TYPES = ['unordered', 'ordered'];
const ORDER_TYPES = ['numbered', 'alphabetically'];
const syncTextListItemsProps = (host, listType, orderType) => {
  Array.from(host.children).forEach((item) => {
    item.listType = listType;
    item.orderType = orderType;
    validateProps.forceUpdate(item);
  });
};

const getComponentCss$1 = (theme) => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
        counterReset: validateProps.addImportantToRule('section'),
      },
      '[role]': Object.assign({ display: 'block', padding: 0, margin: 0, color: validateProps.getThemedColors(theme).primaryColor }, textSmallStyle.textSmallStyle),
    },
  });
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles({ withDarkTheme: true })));
};

const propTypes = {
  listType: validateProps.AllowedTypes.oneOf(LIST_TYPES),
  orderType: validateProps.AllowedTypes.oneOf(ORDER_TYPES),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const TextList = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.listType = 'unordered';
    this.orderType = 'numbered';
    this.theme = 'light';
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss$1, this.theme);
    const TagType = this.listType === 'unordered' ? 'ul' : 'ol';
    syncTextListItemsProps(this.host, this.listType, this.orderType);
    return (validateProps.h(validateProps.Host, Object.assign({}, getDataThemeDarkAttribute.getDataThemeDarkAttribute(this.theme)), validateProps.h(TagType, { role: "list" }, validateProps.h("slot", null))));
  }
  get host() { return validateProps.getElement(this); }
};

const cssVariableOrderedSuffix = '--pds-text-list-item-ordered-suffix';
const cssVariableUnorderedWidth = '--pds-text-list-item-unordered-width';
const cssVariableUnorderedHeight = '--pds-text-list-item-unordered-height';
const cssVariableUnorderedTop = '--pds-text-list-item-unordered-top';
const getComponentCss = (listType, orderType) => {
  const isOrdered = listType === 'ordered';
  const beforeJssStyles = {
    position: 'absolute',
    left: 0,
  };
  return validateProps.getCss({
    '@global': {
      '::slotted(*)': {
        [cssVariableOrderedSuffix]: '""',
        [cssVariableUnorderedWidth]: validateProps.pxToRemWithUnit(8),
        [cssVariableUnorderedHeight]: '1px',
        [cssVariableUnorderedTop]: 'calc(1.5em / 2)',
      },
      ':host': validateProps.addImportantToEachRule({
        position: 'relative',
        display: 'list-item',
        color: 'inherit',
        listStyleType: 'none',
        paddingLeft: validateProps.pxToRemWithUnit(isOrdered ? 40 : 24),
        '&:before': isOrdered
          ? Object.assign(Object.assign(Object.assign({}, beforeJssStyles), { content: `counters(section,".",${orderType === 'numbered' ? 'decimal' : 'lower-latin'}) var(${cssVariableOrderedSuffix},".")`, top: 0, width: validateProps.pxToRemWithUnit(24), height: 'auto', counterIncrement: 'section', textAlign: 'right', backgroundColor: 'transparent' }), textSmallStyle.textSmallStyle) : Object.assign(Object.assign({}, beforeJssStyles), { content: '""', width: `var(${cssVariableUnorderedWidth},${validateProps.pxToRemWithUnit(4)})`, height: `var(${cssVariableUnorderedHeight},${validateProps.pxToRemWithUnit(4)})`, top: `var(${cssVariableUnorderedTop},calc(1.5em / 2 - 0.125em))`, backgroundColor: 'currentColor' }),
      }),
    },
  });
};

const TextListItem = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-text-list');
  }
  render() {
    validateProps.attachComponentCss(this.host, getComponentCss, this.host.listType || 'unordered', // default as fallback
    this.host.orderType || 'numbered' // default as fallback
    );
    return (validateProps.h(validateProps.Host, { role: "listitem" }, validateProps.h("slot", null)));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_text_list = TextList;
exports.p_text_list_item = TextListItem;
