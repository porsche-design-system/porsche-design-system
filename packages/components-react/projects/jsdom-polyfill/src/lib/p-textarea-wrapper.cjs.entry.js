'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const required = require('./required-2c3ad64c.js');
const hasDescription = require('./hasDescription-b1e1f402.js');
const isVisibleFormState = require('./isVisibleFormState-024f87c3.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getOnlyChildOfKindHTMLElementOrThrow = require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
const formStyles = require('./form-styles-e5f9c86c.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./hasNamedSlot-c9552a6a.js');
require('./spacingStaticXSmall-0918e28c.js');
require('./isParentOfKind-9c1048fd.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./transformSelectorToDirectChildSelector-f570e779.js');
require('./textXSmallStyle-0148b295.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');

const getComponentCss = (isDisabled, hideLabel, state, isCounterVisible, hasCounter) => {
  const theme = 'light';
  const hasVisibleState = isVisibleFormState.isVisibleFormState(state);
  const { contrastMediumColor } = validateProps.getThemedColors(theme);
  const defaultPadding = validateProps.pxToRemWithUnit(hasVisibleState ? 10 : 11);
  return validateProps.getCss(Object.assign(Object.assign(Object.assign(Object.assign({ '@global': Object.assign({ ':host': {
        display: 'block',
      } }, validateProps.mergeDeep(validateProps.addImportantToEachRule(formStyles.getBaseChildStyles('textarea', state, theme, {
      // 36 = 2 * 6 + 24 where 6 is the bottom distance and 24 the height of the text
      padding: isCounterVisible
        ? [defaultPadding, defaultPadding, validateProps.pxToRemWithUnit(36)].join(' ')
        : defaultPadding,
      resize: 'vertical',
    })), {
      '::slotted(textarea)': {
        minHeight: validateProps.pxToRemWithUnit(192), // min-height should be overridable
      },
    })) }, formStyles.getLabelStyles('textarea', isDisabled, hideLabel, state, theme, isCounterVisible && {
    counter: Object.assign(Object.assign({ position: 'absolute', bottom: validateProps.pxToRemWithUnit(6), right: validateProps.pxToRemWithUnit(12), zIndex: 1 }, textSmallStyle.textSmallStyle), { color: contrastMediumColor }),
  })), required.getFunctionalComponentRequiredStyles(theme)), required.getFunctionalComponentStateMessageStyles(theme, state)), (hasCounter && {
    'sr-only': Object.assign(Object.assign({}, validateProps.getScreenReaderOnlyJssStyle()), { padding: 0 }),
  })));
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, validateProps.getBaseSlottedStyles()));
};

const propTypes = {
  label: validateProps.AllowedTypes.string,
  description: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(required.FORM_STATES),
  message: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  showCharacterCount: validateProps.AllowedTypes.boolean,
};
const TextareaWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.onLabelClick = () => {
      this.textarea.focus();
    };
    this.observeAttributes = () => {
      validateProps.observeAttributes(this.textarea, ['disabled', 'readonly', 'required'], () => validateProps.forceUpdate(this.host));
    };
    this.label = '';
    this.description = '';
    this.state = 'none';
    this.message = '';
    this.hideLabel = false;
    this.showCharacterCount = true;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }
  componentWillLoad() {
    this.textarea = getOnlyChildOfKindHTMLElementOrThrow.getOnlyChildOfKindHTMLElementOrThrow(this.host, 'textarea');
    this.observeAttributes(); // once initially
    this.hasCounter = validateProps.hasCounter(this.textarea);
    this.isCounterVisible = this.showCharacterCount && this.hasCounter;
  }
  componentDidLoad() {
    if (this.hasCounter) {
      validateProps.addInputEventListenerForCounter(this.textarea, this.ariaElement, this.counterElement);
    }
  }
  componentDidRender() {
    /*
     * This is a workaround to improve accessibility because the textarea and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots.
     */
    a11y.setAriaAttributes(this.textarea, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }
  disconnectedCallback() {
    validateProps.unobserveAttributes(this.textarea);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.textarea.disabled, this.hideLabel, this.state, this.isCounterVisible, this.hasCounter);
    const labelProps = {
      onClick: this.onLabelClick,
    };
    return (validateProps.h(validateProps.Host, null, validateProps.h("label", { class: "label" }, required.hasLabel(this.host, this.label) && (validateProps.h("span", Object.assign({ class: "label__text" }, labelProps), this.label || validateProps.h("slot", { name: "label" }), isVisibleFormState.isRequiredAndParentNotRequired(this.host, this.textarea) && validateProps.h(required.Required, null))), hasDescription.hasDescription(this.host, this.description) && (validateProps.h("span", Object.assign({ class: "label__text label__text--description" }, labelProps), this.description || validateProps.h("slot", { name: "description" }))), this.isCounterVisible && (validateProps.h("span", Object.assign({ class: "counter" }, labelProps, { "aria-hidden": "true", ref: (el) => (this.counterElement = el) }))), validateProps.h("slot", null), this.hasCounter && validateProps.h("span", { class: "sr-only", ref: (el) => (this.ariaElement = el), "aria-live": "polite" })), required.hasMessage(this.host, this.message, this.state) && (validateProps.h(required.StateMessage, { state: this.state, message: this.message, host: this.host }))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_textarea_wrapper = TextareaWrapper;
