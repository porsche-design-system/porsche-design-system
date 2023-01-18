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

const theme = 'light';
const getBackgroundImageStyles = (hasVisibleState, innerCircleColor, outerCircleColor) => {
  const maskColor = validateProps.getThemedColors(theme).backgroundColor.replace(/#/g, '%23');
  return {
    backgroundImage: `url(${
    // SVG images act like a mask to smooth the circle radius
    hasVisibleState
      ? `'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><g fill="${maskColor}" fill-rule="nonzero"><path d="M14 26c6.627 0 12-5.373 12-12S20.627 2 14 2 2 7.373 2 14s5.373 12 12 12zm0 2C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14z"/><path d="M14 21.273a7.273 7.273 0 1 0 0-14.546 7.273 7.273 0 0 0 0 14.546zM14 24C8.477 24 4 19.523 4 14S8.477 4 14 4s10 4.477 10 10-4.477 10-10 10z"/></g></svg>'`
      : `'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><g fill="${maskColor}" fill-rule="nonzero"><path d="M14 26c6.627 0 12-5.373 12-12S20.627 2 14 2 2 7.373 2 14s5.373 12 12 12zm0 2C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14z"/><path d="M14 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 3C7.925 25 3 20.075 3 14S7.925 3 14 3s11 4.925 11 11-4.925 11-11 11z"/></g></svg>'`}), radial-gradient(circle, ${innerCircleColor} ${validateProps.pxToRemWithUnit(9)}, ${outerCircleColor} ${validateProps.pxToRemWithUnit(9)})`,
  };
};
const getComponentCss = (hideLabel, state, isDisabled) => {
  const size = validateProps.pxToRemWithUnit(28);
  const hasVisibleState = isVisibleFormState.isVisibleFormState(state);
  const { primaryColor, backgroundColor, contrastMediumColor, contrastHighColor, disabledColor } = validateProps.getThemedColors(theme);
  const { formStateColor, formStateHoverColor } = required.getThemedFormStateColors(theme, state);
  return validateProps.getCss(Object.assign(Object.assign({ '@global': {
      ':host': {
        display: 'block',
      },
      '::slotted': validateProps.addImportantToEachRule(Object.assign(Object.assign({ '&(input)': Object.assign({ position: 'static', width: size, height: size, flexShrink: 0, display: 'block', margin: validateProps.pxToRemWithUnit(-2), padding: 0, WebkitAppearance: 'none', appearance: 'none', boxSizing: 'border-box', backgroundSize: size, backgroundPosition: 'center', backgroundColor: 'transparent', transition: validateProps.getTransition('background-image'), opacity: 1, border: `2px solid ${backgroundColor}`, borderRadius: '50%', outline: 'none', cursor: 'pointer' }, getBackgroundImageStyles(hasVisibleState, backgroundColor, formStateColor || contrastMediumColor)), '&(input:checked)': getBackgroundImageStyles(hasVisibleState, formStateColor || contrastHighColor, formStateColor || contrastHighColor) }, validateProps.hoverMediaQuery({
        '&(input:not(:disabled):not(:checked):hover), .label:hover ~ &(input:not(:disabled):not(:checked))': getBackgroundImageStyles(hasVisibleState, backgroundColor, formStateHoverColor || primaryColor),
        '&(input:not(:disabled):checked:hover), .label:hover ~ &(input:not(:disabled):checked)': getBackgroundImageStyles(hasVisibleState, formStateColor || contrastHighColor, formStateHoverColor || primaryColor),
      })), { '&(input:disabled)': Object.assign({ cursor: 'not-allowed' }, getBackgroundImageStyles(hasVisibleState, backgroundColor, disabledColor)), '&(input:checked:disabled)': getBackgroundImageStyles(hasVisibleState, disabledColor, disabledColor), '&(input:focus)': {
          boxShadow: `0 0 0 1px ${formStateColor || contrastMediumColor}`,
        }, '&(input:focus:not(:focus-visible))': {
          boxShadow: 'none',
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

const changeHandler = ({ target }) => 
// workaround for Safari >= 15.5 which stopped re-rendering slotted input type radio upon removing checked attribute
document.querySelectorAll(`input[type=radio][name=${target.name}]`).forEach((radio) => {
  radio.setAttribute('hidden', '');
  radio.removeAttribute('hidden');
});
const addChangeListener = (el) => {
  el.addEventListener('change', changeHandler);
};

const propTypes = {
  label: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(required.FORM_STATES),
  message: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
};
const RadioButtonWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.onLabelClick = (event) => {
      /**
       * we only want to simulate the checkbox click by label click
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
    this.input = getOnlyChildOfKindHTMLElementOrThrow.getOnlyChildOfKindHTMLElementOrThrow(this.host, 'input[type=radio]');
    addChangeListener(this.input);
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

exports.p_radio_button_wrapper = RadioButtonWrapper;
