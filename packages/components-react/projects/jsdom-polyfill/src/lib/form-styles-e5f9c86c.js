'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const isVisibleFormState = require('./isVisibleFormState-024f87c3.js');
const required = require('./required-2c3ad64c.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const textXSmallStyle = require('./textXSmallStyle-0148b295.js');

const { disabledColor: lightThemeDisabledColor } = validateProps.getThemedColors('light');
const INPUT_HEIGHT = 48;
const getBaseChildStyles = (child, state, theme, additionalDefaultJssStyle) => {
  const { primaryColor, backgroundColor, contrastHighColor, contrastMediumColor } = validateProps.getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = required.getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState.isVisibleFormState(state);
  // TODO: Add readonly color to utilities package
  const readonly = '#ebebeb'; // 🤷
  return Object.assign(Object.assign(Object.assign({ [`::slotted(${child})`]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ display: 'block', position: 'relative' }, validateProps.getInsetJssStyle()), { width: '100%' }), (child !== 'textarea' && { height: validateProps.pxToRemWithUnit(INPUT_HEIGHT) })), { margin: 0, outline: '1px solid transparent', outlineOffset: '2px', WebkitAppearance: 'none', appearance: 'none', boxSizing: 'border-box', border: hasVisibleState ? `2px solid ${formStateColor}` : `1px solid ${contrastMediumColor}`, borderRadius: 0, backgroundColor, opacity: 1 }), textSmallStyle.textSmallStyle), { overflowWrap: null, hyphens: null, textIndent: 0, color: primaryColor, transition: ['color', 'border-color', 'background-color'].map(validateProps.getTransition).join() }), additionalDefaultJssStyle) }, validateProps.hoverMediaQuery({
    // with the media query the selector has higher priority and overrides disabled styles
    [`::slotted(${child}:not(:disabled):not([readonly]):hover)`]: {
      borderColor: formStateHoverColor || (validateProps.isThemeDark(theme) ? contrastHighColor : primaryColor),
    },
  })), { [`::slotted(${child}:focus)`]: {
      outlineColor: formStateColor || contrastMediumColor,
    }, [`::slotted(${child}:disabled)`]: {
      cursor: 'not-allowed',
      color: lightThemeDisabledColor,
      borderColor: lightThemeDisabledColor,
      WebkitTextFillColor: lightThemeDisabledColor, // 🤷 no theming here; fix placeholder color bug in Safari
    } }), (child !== 'select' && {
    [`::slotted(${child}[readonly])`]: {
      borderColor: readonly,
      backgroundColor: readonly,
    },
    [`::slotted(${child}[readonly]:focus)`]: {
      outlineColor: 'transparent',
    },
    [`::slotted(${child}[readonly]:not(:disabled))`]: {
      color: contrastMediumColor,
    },
  }));
};
const getLabelStyles = (child, isDisabled, hideLabel, state, theme, counterOrUnitOrIconStyles) => {
  const { primaryColor, disabledColor, contrastHighColor } = validateProps.getThemedColors(theme);
  const { formStateHoverColor } = required.getThemedFormStateColors(theme, state);
  const hasVisibleState = isVisibleFormState.isVisibleFormState(state);
  // jss prefers flat and simple selectors, therefore we reuse properties
  const labelTextHoverJssStyle = validateProps.hoverMediaQuery({
    '&:hover': {
      [`&~::slotted(${child}:not(:disabled):not([readonly]))` +
        (hasVisibleState ? `,::slotted(${child}:not(:disabled):not([readonly]):hover)` : '')]: {
        borderColor: validateProps.addImportantToRule(hasVisibleState ? formStateHoverColor : primaryColor),
      },
    },
  });
  const counterOrUnitOrIconStylesKey = counterOrUnitOrIconStyles && Object.keys(counterOrUnitOrIconStyles)[0];
  return Object.assign({ label: {
      display: 'block',
      position: 'relative',
      '&__text': Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ display: 'block' }, validateProps.buildResponsiveStyles(hideLabel, validateProps.getFormTextHiddenJssStyle)), textSmallStyle.textSmallStyle), { color: isDisabled ? disabledColor : primaryColor, transition: validateProps.getTransition('color'), '&+&--description': Object.assign({ marginTop: validateProps.pxToRemWithUnit(-4), paddingBottom: validateProps.pxToRemWithUnit(8) }, textXSmallStyle.textXSmallStyle) }), (!isDisabled && {
        '&--description': {
          color: contrastHighColor,
        },
      })), labelTextHoverJssStyle),
    } }, (counterOrUnitOrIconStyles && {
    [counterOrUnitOrIconStylesKey]: Object.assign(Object.assign(Object.assign({}, counterOrUnitOrIconStyles[counterOrUnitOrIconStylesKey]), (isDisabled && {
      color: disabledColor,
      cursor: 'not-allowed',
    })), labelTextHoverJssStyle),
  }));
};

exports.INPUT_HEIGHT = INPUT_HEIGHT;
exports.getBaseChildStyles = getBaseChildStyles;
exports.getLabelStyles = getLabelStyles;
