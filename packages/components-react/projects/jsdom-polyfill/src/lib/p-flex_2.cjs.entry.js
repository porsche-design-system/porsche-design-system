'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const throwIfParentIsNotOfKind = require('./throwIfParentIsNotOfKind-d2c71eef.js');
require('./isParentOfKind-9c1048fd.js');

const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'];
const FLEX_DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];
const FLEX_JUSTIFY_CONTENTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const FLEX_ALIGN_ITEMS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'];
const FLEX_ALIGN_CONTENTS = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];

const getComponentCss$1 = (inline, wrap, direction, justifyContent, alignItems, alignContent) => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule(validateProps.mergeDeep(validateProps.buildResponsiveStyles(inline, (inlineResponsive) => ({
        display: inlineResponsive ? 'inline-flex' : 'flex',
      })), validateProps.buildResponsiveStyles(wrap, (flexWrapResponsive) => ({ flexWrap: flexWrapResponsive })), validateProps.buildResponsiveStyles(direction, (flexDirectionResponsive) => ({
        flexDirection: flexDirectionResponsive,
      })), validateProps.buildResponsiveStyles(justifyContent, (justifyContentResponsive) => ({
        justifyContent: justifyContentResponsive,
      })), validateProps.buildResponsiveStyles(alignItems, (alignItemsResponsive) => ({
        alignItems: alignItemsResponsive,
      })), validateProps.buildResponsiveStyles(alignContent, (alignContentResponsive) => ({
        alignContent: alignContentResponsive,
      })))),
    },
  });
};

const propTypes$1 = {
  inline: validateProps.AllowedTypes.breakpoint('boolean'),
  wrap: validateProps.AllowedTypes.breakpoint(FLEX_WRAPS),
  direction: validateProps.AllowedTypes.breakpoint(FLEX_DIRECTIONS),
  justifyContent: validateProps.AllowedTypes.breakpoint(FLEX_JUSTIFY_CONTENTS),
  alignItems: validateProps.AllowedTypes.breakpoint(FLEX_ALIGN_ITEMS),
  alignContent: validateProps.AllowedTypes.breakpoint(FLEX_ALIGN_CONTENTS),
};
const Flex = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.inline = false;
    this.wrap = 'nowrap';
    this.direction = 'row';
    this.justifyContent = 'flex-start';
    this.alignItems = 'stretch';
    this.alignContent = 'stretch';
  }
  render() {
    validateProps.validateProps(this, propTypes$1);
    validateProps.attachComponentCss(this.host, getComponentCss$1, this.inline, this.wrap, this.direction, this.justifyContent, this.alignItems, this.alignContent);
    return validateProps.h("slot", null);
  }
  get host() { return validateProps.getElement(this); }
};

const flexItemWidths = {
  none: 0,
  'one-quarter': 25,
  'one-third': 33.333333,
  half: 50,
  'two-thirds': 66.666667,
  'three-quarters': 75,
  full: 100,
  auto: 'auto',
};
const getComponentCss = (width, offset, alignSelf, grow, shrink, flex) => {
  return validateProps.getCss({
    '@global': {
      ':host': validateProps.addImportantToEachRule(Object.assign({ boxSizing: 'border-box' }, validateProps.mergeDeep(validateProps.buildResponsiveStyles(width, (widthResponsive) => ({
        width: `${flexItemWidths[widthResponsive]}%`,
      })), validateProps.buildResponsiveStyles(offset, (offsetResponsive) => ({
        marginLeft: `${flexItemWidths[offsetResponsive]}%`,
      })), validateProps.buildResponsiveStyles(alignSelf, (alignSelfResponsive) => ({
        alignSelf: alignSelfResponsive,
      })), flex !== 'initial' // flex shorthand conflicts with grow and shrink, which means even default grow or shrink props would override flex
        ? validateProps.buildResponsiveStyles(flex, (flexResponsive) => ({
          flex: flexResponsive === 'equal' ? '1 1 0' : flexResponsive,
        }))
        : validateProps.mergeDeep(validateProps.buildResponsiveStyles(grow, (flexGrow) => ({ flexGrow })), validateProps.buildResponsiveStyles(shrink, (flexShrink) => ({ flexShrink })))))),
    },
  });
};

const FLEX_ITEM_WIDTHS = [
  'auto',
  'one-quarter',
  'one-third',
  'half',
  'two-thirds',
  'three-quarters',
  'full',
];
const FLEX_ITEM_OFFSETS = ['none', 'one-quarter', 'one-third', 'half', 'two-thirds', 'three-quarters'];
const FLEX_ITEM_ALIGN_SELFS = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
const FLEX_ITEM_GROWS = [0, 1];
const FLEX_ITEM_SHRINKS = [0, 1];
const FLEX_ITEM_FLEXS = ['initial', 'auto', 'none', 'equal'];

const propTypes = {
  width: validateProps.AllowedTypes.breakpoint(FLEX_ITEM_WIDTHS),
  offset: validateProps.AllowedTypes.breakpoint(FLEX_ITEM_OFFSETS),
  alignSelf: validateProps.AllowedTypes.breakpoint(FLEX_ITEM_ALIGN_SELFS),
  grow: validateProps.AllowedTypes.breakpoint(FLEX_ITEM_GROWS),
  shrink: validateProps.AllowedTypes.breakpoint(FLEX_ITEM_SHRINKS),
  flex: validateProps.AllowedTypes.breakpoint(FLEX_ITEM_FLEXS),
};
const FlexItem = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.width = 'auto';
    this.offset = 'none';
    this.alignSelf = 'auto';
    this.grow = 0;
    this.shrink = 1;
    this.flex = 'initial';
  }
  connectedCallback() {
    throwIfParentIsNotOfKind.throwIfParentIsNotOfKind(this.host, 'p-flex');
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.width, this.offset, this.alignSelf, this.grow, this.shrink, this.flex);
    return validateProps.h("slot", null);
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_flex = Flex;
exports.p_flex_item = FlexItem;
