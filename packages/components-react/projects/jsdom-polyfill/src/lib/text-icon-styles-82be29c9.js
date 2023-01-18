'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const getThemedTextColor = (theme, textColor) => {
  const { primaryColor, contrastHighColor, contrastMediumColor, contrastLowColor, successColor, errorColor, warningColor, infoColor, } = validateProps.getThemedColors(theme);
  const colorMap = {
    primary: primaryColor,
    brand: primaryColor,
    default: primaryColor,
    'neutral-contrast-high': contrastHighColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-low': contrastLowColor,
    'notification-success': successColor,
    'notification-warning': warningColor,
    'notification-error': errorColor,
    'notification-info': infoColor,
    'notification-neutral': infoColor,
    inherit: 'currentColor',
  };
  return colorMap[textColor];
};

exports.getThemedTextColor = getThemedTextColor;
