'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getDataThemeDarkAttribute = require('./getDataThemeDarkAttribute-3ea7a73c.js');
const theme = require('./theme-25a5ded7.js');
const typographyStyles = require('./typography-styles-64078132.js');
const textColor = require('./text-color-f242ce00.js');
const textWeight = require('./text-weight-9b6bcbf7.js');
const textIconStyles = require('./text-icon-styles-82be29c9.js');
const fontWeightStyles = require('./font-weight-styles-cee9f15d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./textXSmallStyle-0148b295.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./fontSizeTextMedium-c20ab60d.js');
require('./fontSizeTextXLarge-991527e3.js');

const getComponentCss = (size, weight, align, color, ellipsis, theme) => {
  // function is local to reuse `weight` parameter
  // TODO: font shorthand isn't really the best choice but we don't have any better alternative atm
  const getSizeJssStyle = (textSize) => {
    const fontWeightValue = fontWeightStyles.getFontWeight(weight);
    return textSize === 'inherit'
      ? {
        fontSize: textSize,
        fontWeight: fontWeightValue,
      }
      : { font: typographyStyles.textMap[textSize].font.replace('400', fontWeightValue) };
  };
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': {
        '&(p),&(address),&(blockquote),&(figcaption),&(cite),&(time),&(legend)': validateProps.addImportantToEachRule(typographyStyles.getSlottedTypographyJssStyle()),
      },
    },
    root: Object.assign(Object.assign(Object.assign(Object.assign({ display: 'inherit', padding: 0, margin: 0, textAlign: align }, textSmallStyle.textSmallStyle), { color: textIconStyles.getThemedTextColor(theme, color), listStyleType: 'none', whiteSpace: 'inherit' }), (ellipsis && typographyStyles.getEllipsisJssStyle())), validateProps.buildResponsiveStyles(size, getSizeJssStyle)),
  });
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, Object.assign({ '& button': {
      margin: 0,
      padding: 0,
      background: 0,
      border: 0,
      cursor: 'pointer',
      font: 'inherit',
    } }, Object.entries(validateProps.getBaseSlottedStyles({ withDarkTheme: true })).reduce((result, [key, value]) => {
    result[key.includes(' a') ? `${key},${key.replace(' a', ' button')}` : key] = value;
    return result;
  }, {}))));
};

const TEXT_TAGS = ['p', 'span', 'div', 'address', 'blockquote', 'figcaption', 'cite', 'time', 'legend'];

const propTypes = {
  tag: validateProps.AllowedTypes.oneOf(TEXT_TAGS),
  size: validateProps.AllowedTypes.breakpoint(textWeight.TEXT_SIZES),
  weight: validateProps.AllowedTypes.oneOf(textWeight.TEXT_WEIGHTS),
  align: validateProps.AllowedTypes.oneOf(typographyStyles.TEXT_ALIGNS),
  color: validateProps.AllowedTypes.oneOf(textColor.TEXT_COLORS),
  ellipsis: validateProps.AllowedTypes.boolean,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Text = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.tag = 'p';
    this.size = 'small';
    this.weight = 'regular';
    this.align = 'left';
    this.color = 'primary';
    this.ellipsis = false;
    this.theme = 'light';
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.size, this.weight, this.align, this.color, this.ellipsis, this.theme);
    const firstChild = validateProps.getHTMLElement(this.host, ':first-child');
    const hasSlottedTextTag = firstChild === null || firstChild === void 0 ? void 0 : firstChild.matches('p,span,div,address,blockquote,figcaption,cite,time,legend');
    const TagType = hasSlottedTextTag ? 'div' : this.tag;
    return (validateProps.h(validateProps.Host, Object.assign({}, getDataThemeDarkAttribute.getDataThemeDarkAttribute(this.theme)), validateProps.h(TagType, { class: "root" }, validateProps.h("slot", null))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_text = Text;
