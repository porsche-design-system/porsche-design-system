'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const getClosestHTMLElement = require('./getClosestHTMLElement-883782e1.js');
const required = require('./required-2c3ad64c.js');
const isVisibleFormState = require('./isVisibleFormState-024f87c3.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getOnlyChildOfKindHTMLElementOrThrow = require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
const checkboxRadioStyles = require('./checkbox-radio-styles-c751f75e.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./hasNamedSlot-c9552a6a.js');
require('./spacingStaticXSmall-0918e28c.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./isParentOfKind-9c1048fd.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./transformSelectorToDirectChildSelector-f570e779.js');

const getComponentCss = (hideLabel, state, isDisabled) => {
  const theme = 'light';
  const size = validateProps.pxToRemWithUnit(24);
  const hasVisibleState = isVisibleFormState.isVisibleFormState(state);
  const { primaryColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor } = validateProps.getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = required.getThemedFormStateColors(theme, state);
  const iconColor = backgroundColor.replace(/#/g, '%23');
  return validateProps.getCss(Object.assign(Object.assign({ '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': validateProps.addImportantToEachRule(Object.assign(Object.assign({ '&(input)': {
          position: 'static',
          width: size,
          height: size,
          flexShrink: 0,
          display: 'block',
          margin: 0,
          padding: 0,
          WebkitAppearance: 'none',
          appearance: 'none',
          boxSizing: 'border-box',
          backgroundSize: size,
          backgroundPosition: hasVisibleState ? '-2px -2px' : '-1px -1px',
          backgroundColor,
          transition: ['border-color', 'background-color'].map(validateProps.getTransition).join(),
          opacity: 1,
          border: hasVisibleState ? `2px solid ${formStateColor}` : `1px solid ${contrastMediumColor}`,
          borderRadius: 0,
          outline: '1px solid transparent',
          outlineOffset: '2px',
          cursor: 'pointer',
        }, '&(input:checked)': {
          backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${iconColor}" d="M9 19l-6-7h1.5l4.49 5.36L19.5 5H21L9 19z"/></svg>')`,
        }, '&(input:indeterminate)': {
          backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${iconColor}" d="M3 11h18v1H3z"/></svg>')`,
        }, '&(input:checked), &(input:indeterminate)': {
          borderColor: formStateColor || contrastHighColor,
          backgroundColor: formStateColor || contrastHighColor,
        } }, validateProps.hoverMediaQuery({
        '&(input:not(:disabled):hover), .label:hover ~ &(input:not(:disabled))': {
          borderColor: formStateHoverColor || primaryColor,
        },
      })), { '&(input:indeterminate:disabled), &(input:checked:disabled)': {
          backgroundColor: disabledColor,
        }, '&(input:disabled)': {
          borderColor: disabledColor,
          cursor: 'not-allowed',
        }, '&(input:focus)': {
          outlineColor: formStateColor || contrastMediumColor,
        }, '&(input:focus:not(:focus-visible))': {
          outlineColor: 'transparent',
        } })),
      label: {
        position: 'relative',
        display: 'flex',
      },
    }, label: checkboxRadioStyles.getCheckboxRadioLabelJssStyle(isDisabled, hideLabel, theme) }, required.getFunctionalComponentRequiredStyles(theme)), required.getFunctionalComponentStateMessageStyles(theme, state)));
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles()));
};

const propTypes = {
  label: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(required.FORM_STATES),
  message: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
};
const CheckboxWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.onLabelClick = (event) => {
      /**
       * we only want to simulate the input click by label click
       * also we don't want to click to the input, if a link is clicked.
       */
      if (getClosestHTMLElement.getClosestHTMLElement(event.target, 'a') === null) {
        this.input.click();
      }
    };
    this.observeAttributes = () => {
      validateProps.observeAttributes(this.input, ['disabled', 'required'], () => validateProps.forceUpdate(this.host));
    };
    this.label = '';
    this.state = 'none';
    this.message = '';
    this.hideLabel = false;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }
  componentWillLoad() {
    this.input = getOnlyChildOfKindHTMLElementOrThrow.getOnlyChildOfKindHTMLElementOrThrow(this.host, 'input[type=checkbox]');
    this.observeAttributes(); // once initially
  }
  componentDidRender() {
    /*
     * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
     */
    a11y.setAriaAttributes(this.input, {
      label: this.label,
      message: this.message,
      state: this.state,
    });
  }
  disconnectedCallback() {
    validateProps.unobserveAttributes(this.input);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.hideLabel, this.state, this.input.disabled);
    return (validateProps.h(validateProps.Host, null, validateProps.h("label", null, required.hasLabel(this.host, this.label) && (validateProps.h("span", { class: "label", onClick: this.onLabelClick }, this.label || validateProps.h("slot", { name: "label" }), isVisibleFormState.isRequiredAndParentNotRequired(this.host, this.input) && validateProps.h(required.Required, null))), validateProps.h("slot", null)), required.hasMessage(this.host, this.message, this.state) && (validateProps.h(required.StateMessage, { state: this.state, message: this.message, host: this.host }))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_checkbox_wrapper = CheckboxWrapper;
