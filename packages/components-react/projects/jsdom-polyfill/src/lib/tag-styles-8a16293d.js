'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const textXSmallStyle = require('./textXSmallStyle-0148b295.js');
const fontVariant = require('./fontVariant-54ee1e6c.js');
const fontStyleItalic = require('./fontStyleItalic-33c41474.js');

const fontStyle = {
    normal: fontVariant.fontStyleNormal,
    italic: fontStyleItalic.fontStyleItalic,
};

const TAG_DISMISSIBLE_COLORS = ['background-surface', 'background-default'];
const TAG_DISMISSIBLE_ARIA_ATTRIBUTES = ['aria-label'];

const TAG_COLORS = [
  ...TAG_DISMISSIBLE_COLORS,
  'neutral-contrast-high',
  'notification-information',
  'notification-warning',
  'notification-success',
  'notification-error',
];
const hasInvertedThemeColor = (tagColor, theme) => {
  const isDark = validateProps.isThemeDark(theme);
  return ((!isDark && tagColor === 'neutral-contrast-high') ||
    (isDark && tagColor !== 'background-surface' && tagColor !== 'background-default'));
};

const getThemedBackgroundColor = (tagColor, themedColors) => {
  const colorMap = {
    'background-default': themedColors.backgroundColor,
    'background-surface': themedColors.backgroundSurfaceColor,
    'neutral-contrast-high': themedColors.contrastHighColor,
    'notification-information': themedColors.infoSoftColor,
    'notification-success': themedColors.successSoftColor,
    'notification-error': themedColors.errorSoftColor,
    'notification-warning': themedColors.warningSoftColor,
  };
  return colorMap[tagColor];
};
const getColors = (tagColor, theme) => {
  const themedColors = validateProps.getThemedColors(theme);
  const hasInvertedTheme = hasInvertedThemeColor(tagColor, theme);
  const { primaryColor, hoverColor } = hasInvertedTheme ? validateProps.getInvertedThemedColors(theme) : themedColors;
  const { focusColor, primaryColor: themedBaseColor } = themedColors;
  return {
    primaryColor,
    hoverColor,
    outlineColor: hasInvertedTheme ? themedBaseColor : focusColor,
    backgroundColor: getThemedBackgroundColor(tagColor, themedColors),
  };
};
const slottedTextJssStyle = {
  '&(strong),&(b)': {
    fontWeight: validateProps.fontWeight.bold,
  },
  '&(em),&(i)': {
    fontStyle,
  },
};
const getTagFocusJssStyle = (focusColor, focusHoverColor) => {
  return {
    '&::before': Object.assign(Object.assign({ content: '""', position: 'absolute' }, validateProps.getInsetJssStyle(-3)), { border: '1px solid transparent', borderRadius: validateProps.pxToRemWithUnit(6), transition: validateProps.getTransition('border-color') }),
    '&:focus::before': {
      borderColor: focusColor,
    },
    '&:focus:not(:focus-visible)::before': {
      borderColor: 'transparent',
    },
    '&:hover:focus::before': validateProps.hoverMediaQuery({
      borderColor: focusHoverColor,
    }),
  };
};
const getComponentCss = (tagColor, isFocusable, theme) => {
  const { primaryColor, hoverColor, backgroundColor, outlineColor } = getColors(tagColor, theme);
  return validateProps.getCss({
    '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
      },
      span: Object.assign(Object.assign(Object.assign({ display: 'flex', alignItems: 'center', position: 'relative', height: validateProps.pxToRemWithUnit(24), padding: `0 ${validateProps.pxToRemWithUnit(6)}`, borderRadius: validateProps.pxToRemWithUnit(4), background: backgroundColor, color: primaryColor }, textXSmallStyle.textXSmallStyle), { whiteSpace: 'nowrap' }), (isFocusable && Object.assign({ transition: validateProps.getTransition('color') }, validateProps.hoverMediaQuery({
        '&:hover': {
          color: hoverColor,
        },
      })))),
      '::slotted': validateProps.addImportantToEachRule(Object.assign(Object.assign(Object.assign({ '&(a),&(button)': {
          display: 'inline',
          position: 'static',
          textDecoration: 'underline',
          cursor: 'pointer',
          font: 'inherit',
          outline: 0,
          color: 'inherit',
        } }, Object.entries(getTagFocusJssStyle(outlineColor, hoverColor)).reduce((result, [key, value]) => {
        result[key.replace(/^&([a-z:\-()]*)(::[a-z\-]+)$/, '&(a$1)$2, &(button$1)$2')] = value;
        return result;
      }, {})), { '&(button)': {
          margin: 0,
          padding: 0,
          background: 0,
          border: 0,
          textAlign: 'left',
        }, '&(br)': {
          display: 'none',
        } }), slottedTextJssStyle)),
    },
    icon: {
      margin: `0 ${validateProps.pxToRemWithUnit(2)} 0 ${validateProps.pxToRemWithUnit(-2)}`,
    },
  });
};

exports.TAG_COLORS = TAG_COLORS;
exports.TAG_DISMISSIBLE_ARIA_ATTRIBUTES = TAG_DISMISSIBLE_ARIA_ATTRIBUTES;
exports.getComponentCss = getComponentCss;
exports.getTagFocusJssStyle = getTagFocusJssStyle;
exports.getThemedBackgroundColor = getThemedBackgroundColor;
exports.slottedTextJssStyle = slottedTextJssStyle;
