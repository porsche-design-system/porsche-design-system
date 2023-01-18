'use strict';

const hasNamedSlot = require('./hasNamedSlot-c9552a6a.js');
const validateProps = require('./validateProps-3b506a0d.js');
const spacingStaticXSmall = require('./spacingStaticXSmall-0918e28c.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');

const FORM_STATES = ['none', 'error', 'success'];

const getRole = (state) => {
  return state === 'error' ? 'alert' : state === 'success' ? 'status' : null;
};

const hasLabel = (element, label) => {
  return !!label || hasNamedSlot.hasNamedSlot(element, 'label');
};

const hasMessage = (element, message, state) => {
  return (message || hasNamedSlot.hasNamedSlot(element, 'message')) && ['success', 'error'].includes(state);
};

const getThemedFormStateColors = (theme, state) => {
  const themedColors = validateProps.getThemedColors(theme);
  return {
    formStateColor: themedColors[`${state}Color`],
    formStateHoverColor: themedColors[`${state}ColorDarken`],
  };
};

const getFunctionalComponentRequiredStyles = (theme) => {
  return {
    required: {
      userSelect: 'none',
      color: validateProps.getThemedColors(theme).errorColor,
    },
  };
};

const getFunctionalComponentStateMessageStyles = (theme, state) => {
  return {
    message: Object.assign(Object.assign({ display: 'flex', marginTop: spacingStaticXSmall.spacingStaticXSmall }, textSmallStyle.textSmallStyle), { color: getThemedFormStateColors(theme, state).formStateColor, transition: validateProps.getTransition('color'), '&__icon': {
        marginRight: spacingStaticXSmall.spacingStaticXSmall,
      } }),
  };
};

const StateMessage = ({ id, state, message, host }) => {
  const PrefixedTagNames = validateProps.getPrefixedTagNames(host);
  return (validateProps.h("span", { id: id, class: "message", role: getRole(state) },
    validateProps.h(PrefixedTagNames.pIcon, { class: "message__icon", name: state === 'error' ? 'exclamation' : 'check', color: "inherit", "aria-hidden": "true" }),
    message || validateProps.h("slot", { name: "message" })));
};

const Required = () => {
  return validateProps.h("span", { class: "required" }, " *");
};

exports.FORM_STATES = FORM_STATES;
exports.Required = Required;
exports.StateMessage = StateMessage;
exports.getFunctionalComponentRequiredStyles = getFunctionalComponentRequiredStyles;
exports.getFunctionalComponentStateMessageStyles = getFunctionalComponentStateMessageStyles;
exports.getThemedFormStateColors = getThemedFormStateColors;
exports.hasLabel = hasLabel;
exports.hasMessage = hasMessage;
