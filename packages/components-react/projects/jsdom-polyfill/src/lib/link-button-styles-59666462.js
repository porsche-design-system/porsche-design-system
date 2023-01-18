'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');

const { primaryColor: darkThemeBaseColor } = validateProps.getThemedColors('dark');
const { primaryColor: lightThemeBaseColor } = validateProps.getThemedColors('light');
const getVariantColors = (variant, theme) => {
  const { primaryColor, contrastHighColor, hoverColorDarken, contrastHighColorDarken, primaryColorDarken } = validateProps.getThemedColors(theme);
  const colors = {
    light: {
      primary: {
        primaryColor,
        primaryColorHover: hoverColorDarken,
        baseColor: darkThemeBaseColor,
      },
      secondary: {
        primaryColor: contrastHighColor,
        primaryColorHover: contrastHighColorDarken,
        baseColor: darkThemeBaseColor,
      },
      tertiary: {
        primaryColor: contrastHighColor,
        primaryColorHover: contrastHighColorDarken,
        baseColor: primaryColor,
      },
    },
    dark: {
      primary: {
        primaryColor,
        primaryColorHover: hoverColorDarken,
        baseColor: darkThemeBaseColor,
      },
      secondary: {
        primaryColor: darkThemeBaseColor,
        primaryColorHover: primaryColorDarken,
        baseColor: lightThemeBaseColor,
      },
      tertiary: {
        primaryColor: darkThemeBaseColor,
        primaryColorHover: darkThemeBaseColor,
        baseColor: primaryColor,
      },
    },
  };
  return colors[theme][variant];
};
const linkButtonPadding = `${validateProps.pxToRemWithUnit(11)} ${validateProps.pxToRemWithUnit(15)} ${validateProps.pxToRemWithUnit(11)} ${validateProps.pxToRemWithUnit(39)}`;
const getRootJssStyle = (hideLabel) => {
  return {
    padding: hideLabel ? 0 : linkButtonPadding,
  };
};
const getIconJssStyle = (hideLabel) => {
  return hideLabel
    ? {
      left: '50%',
      top: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
    }
    : {
      left: validateProps.pxToRemWithUnit(11),
      top: validateProps.pxToRemWithUnit(11),
      transform: 'translate3d(0,0,0)',
    };
};
const getLabelJssStyle = (hideLabel) => {
  return hideLabel
    ? {
      width: '1px',
      height: '1px',
      margin: '0 0 0 -1px',
      overflow: 'hidden',
      textIndent: '-1px',
    }
    : {
      width: '100%',
      height: 'auto',
      margin: 0,
      overflow: 'visible',
      textIndent: 0,
    };
};
const getSlottedLinkJssStyle = (hideLabel) => {
  return hideLabel
    ? Object.assign(Object.assign({ position: 'absolute' }, validateProps.getInsetJssStyle()), { padding: 0, overflow: 'hidden', whiteSpace: 'nowrap', textIndent: '99999px' }) : Object.assign(Object.assign({ position: 'static' }, validateProps.getInsetJssStyle('auto')), { padding: linkButtonPadding, overflow: 'visible', whiteSpace: 'normal', textIndent: 0 });
};
const getLinkButtonStyles = (variant, hideLabel, isDisabledOrLoading, hasSlottedAnchor, theme) => {
  const isDarkTheme = validateProps.isThemeDark(theme);
  const isTertiary = variant === 'tertiary';
  const { primaryColor, primaryColorHover, baseColor } = getVariantColors(variant, theme);
  const { disabledColor } = validateProps.getThemedColors(theme);
  const iconLabelColor = isDisabledOrLoading ? (isTertiary ? disabledColor : 'rgba(255,255,255,0.55)') : baseColor;
  return {
    '@global': Object.assign(Object.assign({ ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: validateProps.addImportantToRule(0),
      } }, (hasSlottedAnchor && {
      '::slotted': validateProps.addImportantToEachRule(Object.assign(Object.assign({ '&(a)': Object.assign({ display: 'block', textDecoration: 'none', color: 'inherit', lineHeight: 'inherit', outline: 'transparent solid 1px', outlineOffset: '3px' }, validateProps.buildResponsiveStyles(hideLabel, getSlottedLinkJssStyle)), 
        // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
        '&(a::-moz-focus-inner)': {
          border: 0,
        }, '&(a:focus)': {
          outlineColor: primaryColor,
        } }, validateProps.hoverMediaQuery({
        '&(a:hover:focus)': {
          outlineColor: primaryColorHover,
        },
      })), { '&(a:focus:not(:focus-visible))': {
          outlineColor: 'transparent',
        } })),
    })), { span: Object.assign(Object.assign({ display: 'block', width: '100%', color: iconLabelColor }, textSmallStyle.textSmallStyle), (!hasSlottedAnchor && validateProps.buildResponsiveStyles(hideLabel, getLabelJssStyle))) }),
    // TODO: reduce to only necessary styles (e.g. why boxSizing?)
    // TODO: overhead in link styles when slotted anchor is used
    // TODO: overhead due that link does not need same "reset" styles as button
    root: Object.assign(Object.assign({ display: 'flex', width: '100%', minWidth: validateProps.pxToRemWithUnit(48), minHeight: validateProps.pxToRemWithUnit(48), position: 'relative', margin: 0, padding: 0, boxSizing: 'border-box', outline: 'transparent none', appearance: 'none', cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer', textDecoration: 'none', textAlign: 'left', border: '1px solid currentColor', backgroundColor: isTertiary ? 'transparent' : 'currentColor', color: isDisabledOrLoading ? disabledColor : primaryColor, transition: ['background-color', 'border-color', 'color'].map(validateProps.getTransition).join() }, (!hasSlottedAnchor && Object.assign(Object.assign({}, validateProps.buildResponsiveStyles(hideLabel, getRootJssStyle)), validateProps.getFocusJssStyle()))), (!isDisabledOrLoading &&
      validateProps.hoverMediaQuery({
        '&:hover, &:active': Object.assign({ color: primaryColorHover }, (isTertiary && {
          backgroundColor: 'currentColor',
          '& > span, & > $icon': {
            color: isDarkTheme ? lightThemeBaseColor : darkThemeBaseColor,
          },
        })),
      }))),
    icon: Object.assign({ position: 'absolute', width: validateProps.pxToRemWithUnit(24), height: validateProps.pxToRemWithUnit(24), color: iconLabelColor, pointerEvents: 'none' }, validateProps.buildResponsiveStyles(hideLabel, getIconJssStyle)),
  };
};

exports.getIconJssStyle = getIconJssStyle;
exports.getLabelJssStyle = getLabelJssStyle;
exports.getLinkButtonStyles = getLinkButtonStyles;
exports.getRootJssStyle = getRootJssStyle;
exports.getSlottedLinkJssStyle = getSlottedLinkJssStyle;
