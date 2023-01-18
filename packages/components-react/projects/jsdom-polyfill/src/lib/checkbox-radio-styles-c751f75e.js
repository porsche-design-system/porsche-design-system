'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');

const getCheckboxRadioLabelJssStyle = (isDisabled, hideLabel, theme) => {
  const { primaryColor, disabledColor } = validateProps.getThemedColors(theme);
  return Object.assign(Object.assign(Object.assign({ order: 1, display: 'inline-block', cursor: isDisabled ? 'default' : 'pointer' }, textSmallStyle.textSmallStyle), { color: isDisabled ? disabledColor : primaryColor, transition: validateProps.getTransition('color') }), validateProps.buildResponsiveStyles(hideLabel, validateProps.getFormCheckboxRadioHiddenJssStyle));
};

exports.getCheckboxRadioLabelJssStyle = getCheckboxRadioLabelJssStyle;
