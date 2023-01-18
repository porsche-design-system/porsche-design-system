'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const headingSmallStyle = require('./headingSmallStyle-7dd8e6fb.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const bannerUtils = require('./banner-utils-46a76adc.js');

const mediaQueryS = validateProps.getMediaQueryMin('s');
const getComponentCss = (state, hasAction, hasClose, theme) => {
  const textColor = validateProps.getThemedColors('light').primaryColor;
  return validateProps.getCss(Object.assign(Object.assign({ '@global': {
      ':host': validateProps.addImportantToEachRule(getNotificationRootJssStyle(state, theme)),
      h5: headingSmallStyle.headingSmallStyle,
      p: textSmallStyle.textSmallStyle,
      'h5,p': {
        margin: 0,
        color: textColor,
      },
    }, icon: getNotificationIconJssStyle(state), content: getNotificationContentJssStyle() }, (hasAction && {
    action: {
      gridColumnStart: 1,
      gridRowStart: 2,
      [mediaQueryS]: {
        gridColumnStart: 3,
        gridRowStart: 1,
        marginLeft: validateProps.pxToRemWithUnit(16),
      },
    },
  })), (hasClose && { close: getCloseIconJssStyle() })));
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles()));
};
const getNotificationRootJssStyle = (state, theme) => {
  const themedColors = validateProps.getThemedColors(theme);
  return {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto',
    gridRowGap: validateProps.pxToRemWithUnit(16),
    alignItems: 'start',
    justifyItems: 'start',
    padding: validateProps.pxToRemWithUnit(16),
    background: themedColors[`${state}SoftColor`],
    borderLeft: `${validateProps.pxToRemWithUnit(4)} solid ${themedColors[`${state}Color`]}`,
    [mediaQueryS]: {
      // 4 columns are for icon, content, action button and close button
      gridTemplateColumns: '2rem 1fr auto auto',
    },
  };
};
const getNotificationIconJssStyle = (state) => ({
  display: 'none',
  [mediaQueryS]: {
    display: 'inline-flex',
    color: validateProps.getThemedColors('light')[`${state}Color`],
  },
});
const getNotificationContentJssStyle = () => ({
  display: 'grid',
  gridGap: validateProps.pxToRemWithUnit(4),
  maxWidth: validateProps.pxToRemWithUnit(800),
});
const getCloseIconJssStyle = () => ({
  marginLeft: validateProps.pxToRemWithUnit(16),
});

const INLINE_NOTIFICATION_STATES = [...bannerUtils.BANNER_STATES, 'success'];
const getInlineNotificationIconName = (state) => {
  const stateToIconMap = {
    neutral: 'information',
    warning: 'warning',
    success: 'success',
    error: 'exclamation',
  };
  return stateToIconMap[state];
};
const getContentAriaAttributes = (state, labelId, descriptionId) => {
  const isAlert = state === 'warning' || state === 'error';
  return {
    role: isAlert ? 'alert' : 'status',
    'aria-live': isAlert ? 'assertive' : 'polite',
    'aria-labelledby': labelId,
    'aria-describedby': descriptionId,
  };
};

exports.INLINE_NOTIFICATION_STATES = INLINE_NOTIFICATION_STATES;
exports.getCloseIconJssStyle = getCloseIconJssStyle;
exports.getComponentCss = getComponentCss;
exports.getContentAriaAttributes = getContentAriaAttributes;
exports.getInlineNotificationIconName = getInlineNotificationIconName;
exports.getNotificationContentJssStyle = getNotificationContentJssStyle;
exports.getNotificationIconJssStyle = getNotificationIconJssStyle;
exports.getNotificationRootJssStyle = getNotificationRootJssStyle;
exports.getSlottedCss = getSlottedCss;
