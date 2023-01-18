'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getDataThemeDarkAttribute = require('./getDataThemeDarkAttribute-3ea7a73c.js');
const theme = require('./theme-25a5ded7.js');
const headlineUtils = require('./headline-utils-15ac2664.js');
const typographyStyles = require('./typography-styles-64078132.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const fontVariant = require('./fontVariant-54ee1e6c.js');
const fontStyleItalic = require('./fontStyleItalic-33c41474.js');
const headingShared = require('./headingShared-3815cda4.js');
const fontSizeTextXLarge = require('./fontSizeTextXLarge-991527e3.js');
const headingMediumStyle = require('./headingMediumStyle-7468fe57.js');
const headingSmallStyle = require('./headingSmallStyle-7dd8e6fb.js');
require('./textXSmallStyle-0148b295.js');
require('./textShared-cdf909c4.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./fontSizeTextMedium-c20ab60d.js');

const fontSizeHeadingLarge = fontSizeTextXLarge.fontSizeTextLarge;

const fontSizeHeadingXLarge = fontSizeTextXLarge.fontSizeTextXLarge;

const fontSizeHeadingXXLarge = 'clamp(2.07rem, .96vw + 1.88rem, 2.94rem)';

const fontSizeDisplayLarge = 'clamp(2.49rem, 5.67vw + 1.35rem, 7.59rem)';

const _displayFontPartA = `${fontStyleItalic.fontStyleItalic} ${fontVariant.fontVariant} ${validateProps.fontWeightSemiBold} `;
const _displayFontPartB = `/${fontVariant.fontLineHeight} ${fontVariant.fontFamily}`;

const displayLargeStyle = {
    font: `${_displayFontPartA}${fontSizeDisplayLarge}${_displayFontPartB}`,
};

const headingLargeStyle = {
    font: `${headingShared._headingFontPartA}${fontSizeHeadingLarge}${headingShared._headingFontPartB}`,
};

const headingXLargeStyle = {
    font: `${headingShared._headingFontPartA}${fontSizeHeadingXLarge}${headingShared._headingFontPartB}`,
};

const headingXXLargeStyle = {
    font: `${headingShared._headingFontPartA}${fontSizeHeadingXXLarge}${headingShared._headingFontPartB}`,
};

const headingMap = {
  'large-title': displayLargeStyle,
  'headline-1': headingXXLargeStyle,
  'headline-2': headingXLargeStyle,
  'headline-3': headingLargeStyle,
  'headline-4': headingMediumStyle.headingMediumStyle,
  'headline-5': headingSmallStyle.headingSmallStyle,
};
const getVariantJssStyle = (variant) => {
  return headingMap[variant];
};
const getSizeJssStyle = (textSize) => {
  const { semiBold: fontWeightSemiBold } = validateProps.fontWeight;
  return textSize === 'inherit'
    ? {
      fontSize: textSize,
      fontWeight: fontWeightSemiBold,
    }
    : {
      font: typographyStyles.textMap[textSize].font.replace('400', fontWeightSemiBold),
    };
};
const getComponentCss = (variant, align, color, ellipsis, theme) => {
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': {
        '&(h1),&(h2),&(h3),&(h4),&(h5),&(h6)': validateProps.addImportantToEachRule(typographyStyles.getSlottedTypographyJssStyle()),
      },
    },
    root: Object.assign(Object.assign({ padding: 0, margin: 0, textAlign: align, color: color === 'inherit' ? 'inherit' : validateProps.getThemedColors(theme).primaryColor, whiteSpace: 'inherit' }, (headlineUtils.isVariantType(variant)
      ? getVariantJssStyle(variant)
      : Object.assign(Object.assign(Object.assign({}, textSmallStyle.textSmallStyle), validateProps.buildResponsiveStyles(variant, getSizeJssStyle)), { overflowWrap: null, hyphens: null }))), (ellipsis && typographyStyles.getEllipsisJssStyle())),
  });
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.mergeDeep(validateProps.getBaseSlottedStyles({ withDarkTheme: true }), { '& a': { textDecoration: 'none' } })));
};

const propTypes = {
  // variant: AllowedTypes.string, // TODO: with all the different values this can't easily be validated
  tag: validateProps.AllowedTypes.oneOf([...headlineUtils.HEADLINE_TAGS, undefined]),
  align: validateProps.AllowedTypes.oneOf(typographyStyles.TEXT_ALIGNS),
  color: validateProps.AllowedTypes.oneOf(['primary', 'default', 'inherit']),
  ellipsis: validateProps.AllowedTypes.boolean,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Headline = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.variant = 'headline-1';
    this.tag = undefined;
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
    validateProps.attachComponentCss(this.host, getComponentCss, this.variant, this.align, this.color, this.ellipsis, this.theme);
    const TagName = headlineUtils.getHeadlineTagName(this.host, this.variant, this.tag);
    return (validateProps.h(validateProps.Host, Object.assign({}, getDataThemeDarkAttribute.getDataThemeDarkAttribute(this.theme)), validateProps.h(TagName, { class: "root" }, validateProps.h("slot", null))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_headline = Headline;
