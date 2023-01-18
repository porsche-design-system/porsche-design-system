'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const throwIfParentIsNotOfKind = require('./throwIfParentIsNotOfKind-d2c71eef.js');
require('./isParentOfKind-9c1048fd.js');

const getGutterJssStyle = (gutter) => {
  const gutterRem = `-${validateProps.pxToRemWithUnit(gutter / 2)}`;
  return {
    marginLeft: gutterRem,
    marginRight: gutterRem,
  };
};
const getComponentCss$1 = (direction, wrap, gutter) => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule(Object.assign({ display: 'flex', flex: 'auto', width: 'auto' }, validateProps.mergeDeep(validateProps.buildResponsiveStyles(direction, (flexDirection) => ({ flexDirection })), validateProps.buildResponsiveStyles(wrap, (flexWrap) => ({ flexWrap })), validateProps.buildResponsiveStyles(gutter, getGutterJssStyle)))),
    },
  });
};

const GRID_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];
const GRID_WRAPS = ['nowrap', 'wrap'];
const GRID_GUTTERS = [16, 24, 36];
const syncGridItemsProps = (host, gutter) => {
  Array.from(host.children).forEach((item) => {
    item.gutter = gutter;
    validateProps.forceUpdate(item);
  });
};

const propTypes$1 = {
  direction: validateProps.AllowedTypes.breakpoint(GRID_DIRECTIONS),
  wrap: validateProps.AllowedTypes.breakpoint(GRID_WRAPS),
  gutter: validateProps.AllowedTypes.breakpoint(GRID_GUTTERS),
};
const Grid = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.direction = 'row';
    this.wrap = 'wrap';
    this.gutter = { base: 16, s: 24, m: 36 };
  }
  render() {
    validateProps.validateProps(this, propTypes$1);
    validateProps.attachComponentCss(this.host, getComponentCss$1, this.direction, this.wrap, this.gutter);
    syncGridItemsProps(this.host, this.gutter);
    return validateProps.h("slot", null);
  }
  get host() { return validateProps.getElement(this); }
};

const GRID_ITEM_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const GRID_ITEM_OFFSETS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const gridItemWidths = [
  0, 8.333333, 16.666667, 25, 33.333333, 41.666667, 50, 58.333333, 66.666667, 75, 83.333333, 91.666667, 100,
];
const getComponentCss = (size, offset, gutter) => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule(Object.assign({ boxSizing: 'border-box' }, validateProps.mergeDeep(validateProps.buildResponsiveStyles(size, (sizeResponsive) => ({
        width: `${gridItemWidths[sizeResponsive]}%`,
        minWidth: `${gridItemWidths[sizeResponsive]}%`,
      })), validateProps.buildResponsiveStyles(offset, (offsetResponsive) => ({
        marginLeft: `${gridItemWidths[offsetResponsive]}%`,
      })), validateProps.buildResponsiveStyles(gutter, (gutterResponsive) => {
        const gutterRem = validateProps.pxToRemWithUnit(gutterResponsive / 2);
        return {
          paddingLeft: gutterRem,
          paddingRight: gutterRem,
        };
      })))),
    },
  });
};

const propTypes = {
  size: validateProps.AllowedTypes.breakpoint(GRID_ITEM_SIZES),
  offset: validateProps.AllowedTypes.breakpoint(GRID_ITEM_OFFSETS),
};
const GridItem = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.size = 1;
    this.offset = 0;
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-grid');
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.size, this.offset, this.host.gutter || { base: 16, s: 24, m: 36 } // default as fallback
    );
    return validateProps.h("slot", null);
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_grid = Grid;
exports.p_grid_item = GridItem;
