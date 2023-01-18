'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const buttonHandling = require('./button-handling-a67b074a.js');
const required = require('./required-2c3ad64c.js');
const hasDescription = require('./hasDescription-b1e1f402.js');
const isVisibleFormState = require('./isVisibleFormState-024f87c3.js');
const propertyObserver = require('./property-observer-51888ca1.js');
const slottedStyles = require('./slotted-styles-a900b5d1.js');
const getOnlyChildOfKindHTMLElementOrThrow = require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
const formStyles = require('./form-styles-e5f9c86c.js');
const getClosestHTMLElement = require('./getClosestHTMLElement-883782e1.js');
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

const UNIT_POSITIONS = ['prefix', 'suffix'];
const hasCounterAndIsTypeText = (el) => isType(el.type, 'text') && validateProps.hasCounter(el);
const hasUnitAndIsTypeTextOrNumber = ({ type }, unit) => {
  return !!unit && (isType(type, 'text') || isType(type, 'number'));
};
const isType = (inputType, typeToValidate) => inputType === typeToValidate;
const isWithinForm = (host) => !!getClosestHTMLElement.getClosestHTMLElement(host, 'form');
const hasLocateAction = (icon) => icon === 'locate';
const getInputPadding = (unitElementWidth, unitPosition, state) => {
  const padding = validateProps.pxToRemWithUnit(state !== 'none' ? 10 : 11);
  return unitPosition === 'prefix'
    ? `${padding} ${padding} ${padding} ${validateProps.pxToRemWithUnit(unitElementWidth)}`
    : `${padding} ${validateProps.pxToRemWithUnit(unitElementWidth)} ${padding} ${padding}`;
};
const setInputStyles = (input, unitOrCounterElement, unitPosition, state) => {
  if (unitOrCounterElement) {
    input.style.setProperty('padding', getInputPadding(unitOrCounterElement.offsetWidth, unitPosition, state), 'important');
  }
};
const throwIfUnitLengthExceeded = (unit) => {
  if (unit.length > 5) {
    throw new RangeError(`unit: ${unit} passed to 'p-text-field-wrapper' exceeds the maximum length of 5`);
  }
};
const addInputEventListenerForSearch = (input, inputChangeCallback) => {
  input.addEventListener('input', (e) => {
    inputChangeCallback(!!e.target.value);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && e.target.value) {
      e.preventDefault();
      e.target.value = '';
      // need to emit event so consumer's change listeners fire for resetting a search, etc.
      dispatchInputEvent(e.target);
    }
  });
};
const dispatchInputEvent = (el) => {
  // { bubbles: true } is crucial for react onChange callback getting invoked
  el.dispatchEvent(new Event('input', { bubbles: true }));
};

const getComponentCss = (isDisabled, hideLabel, state, hasUnitOrVisibleCounter, unitPosition, inputType, isWithinForm, hasAction, hasActionLoading) => {
  const theme = 'light';
  const { primaryColor, contrastMediumColor, activeColor, disabledColor, hoverColor } = validateProps.getThemedColors(theme);
  const hasVisibleState = isVisibleFormState.isVisibleFormState(state);
  const isSearch = isType(inputType, 'search');
  const isPassword = isType(inputType, 'password');
  const isSearchOrPassword = isSearch || isPassword;
  const disabledJssStyle = {
    color: disabledColor,
    cursor: 'not-allowed',
  };
  return validateProps.getCss(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ '@global': Object.assign(Object.assign({ ':host': {
        display: 'block',
      } }, validateProps.addImportantToEachRule(Object.assign(Object.assign({}, formStyles.getBaseChildStyles('input', state, theme, Object.assign(Object.assign({}, (!hasUnitOrVisibleCounter && {
      // padding is set via inline style if unit is present
      padding: validateProps.pxToRemWithUnit(hasVisibleState ? 10 : 11),
    })), (isType(inputType, 'number')
      ? {
        MozAppearance: 'textfield', // hides up/down spin button for Firefox
      }
      : isSearchOrPassword && Object.assign({ paddingRight: validateProps.pxToRemWithUnit(isSearch && isWithinForm ? 88 : 48) }, (isSearch && !isWithinForm && { paddingLeft: validateProps.pxToRemWithUnit(48) })))))), { 
      // Reset webkit autofill styles
      '::slotted(input:-internal-autofill-selected),::slotted(input:-internal-autofill-previewed),::slotted(input:-webkit-autofill),::slotted(input:-webkit-autofill:focus)': {
        WebkitBackgroundClip: 'padding-box',
      } }))), (isSearchOrPassword && {
      button: Object.assign(Object.assign(Object.assign(Object.assign({ position: 'absolute', bottom: 0, right: 0, margin: 0, width: validateProps.pxToRemWithUnit(48), height: validateProps.pxToRemWithUnit(48), padding: validateProps.pxToRemWithUnit(12), boxSizing: 'border-box', outline: 'transparent none', appearance: 'none', border: 'none', textDecoration: 'none', background: 'transparent', cursor: 'pointer', color: primaryColor, transition: validateProps.getTransition('color') }, validateProps.getFocusJssStyle({ offset: hasVisibleState ? -5 : -4 })), validateProps.hoverMediaQuery({
        '&:not(:disabled):hover': {
          color: hoverColor,
        },
      })), { '&:active': {
          color: activeColor,
        }, '&:disabled': disabledJssStyle }), (isSearch &&
        isWithinForm && Object.assign(Object.assign({ right: validateProps.pxToRemWithUnit(40) }, (hasActionLoading && {
        '&+button[type=button]': disabledJssStyle, // action button
      })), { '&+button[type=submit]': {
          right: 0, // submit button
        } }))),
    })), root: {
      display: 'block',
      position: 'relative',
    } }, formStyles.getLabelStyles('input', isDisabled, hideLabel, state, theme, hasUnitOrVisibleCounter && {
    unit: Object.assign(Object.assign({ position: 'absolute', bottom: 0, [unitPosition === 'suffix' ? 'right' : 'left']: 0, padding: validateProps.pxToRemWithUnit(12), zIndex: 1, boxSizing: 'border-box' }, textSmallStyle.textSmallStyle), { color: contrastMediumColor }),
  })), required.getFunctionalComponentRequiredStyles(theme)), required.getFunctionalComponentStateMessageStyles(theme, state)), (isSearch &&
    (hasAction || !isWithinForm) && {
    icon: {
      // search icon on left side
      position: 'absolute',
      left: 0,
      bottom: 0,
      color: contrastMediumColor,
      padding: validateProps.pxToRemWithUnit(12),
      pointerEvents: 'none',
    },
  })), { 'sr-only': Object.assign(Object.assign({}, validateProps.getScreenReaderOnlyJssStyle()), { padding: 0 }) }));
};
const getSlottedCss = (host) => {
  return validateProps.getCss(validateProps.buildSlottedStyles(host, Object.assign(Object.assign({}, validateProps.getBaseSlottedStyles()), { 
    // the following selectors don't work within ::slotted() pseudo selector, therefore we have to apply them via light DOM
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button, & input[type="search"]::-webkit-search-decoration': {
      WebkitAppearance: 'none',
      appearance: 'none',
    }, '& input[type="search"]::-webkit-search-cancel-button': {
      display: 'none',
    }, '& input[type="text"]': {
      '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
        marginRight: '2.4375rem',
      },
    } })));
};

const propTypes = {
  label: validateProps.AllowedTypes.string,
  unit: validateProps.AllowedTypes.string,
  unitPosition: validateProps.AllowedTypes.oneOf(UNIT_POSITIONS),
  description: validateProps.AllowedTypes.string,
  state: validateProps.AllowedTypes.oneOf(required.FORM_STATES),
  message: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  showCharacterCount: validateProps.AllowedTypes.boolean,
  actionIcon: validateProps.AllowedTypes.oneOf(['locate', undefined]),
  actionLoading: validateProps.AllowedTypes.boolean,
};
const TextFieldWrapper = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.action = validateProps.createEvent(this, "action", 3);
    this.onLabelClick = () => {
      this.input.focus();
    };
    this.togglePassword = () => {
      this.input.type = isType(this.input.type, 'password') ? 'text' : 'password';
      this.showPassword = !this.showPassword;
      this.onLabelClick();
    };
    this.onSubmit = (event) => {
      buttonHandling.handleButtonEvent(event, this.host, () => 'submit', () => this.input.disabled);
    };
    this.onClear = () => {
      this.onLabelClick();
      this.input.value = '';
      dispatchInputEvent(this.input);
    };
    this.observeAttributes = () => {
      validateProps.observeAttributes(this.input, ['disabled', 'readonly', 'required'], () => validateProps.forceUpdate(this.host));
    };
    this.setInputStyles = () => {
      setInputStyles(this.input, this.unitOrCounterElement, this.isCounterVisible ? 'suffix' : this.unitPosition, this.state);
    };
    this.label = '';
    this.unit = '';
    this.unitPosition = 'prefix';
    this.description = '';
    this.state = 'none';
    this.message = '';
    this.hideLabel = false;
    this.showCharacterCount = true;
    this.actionIcon = undefined;
    this.actionLoading = false;
    this.showPassword = false;
    this.isClearable = false;
  }
  connectedCallback() {
    slottedStyles.attachSlottedCss(this.host, getSlottedCss);
    this.observeAttributes(); // on every reconnect
  }
  componentWillLoad() {
    this.input = getOnlyChildOfKindHTMLElementOrThrow.getOnlyChildOfKindHTMLElementOrThrow(this.host, ['text', 'number', 'email', 'tel', 'search', 'url', 'date', 'time', 'month', 'week', 'password']
      .map((type) => `input[type=${type}]`)
      .join());
    this.observeAttributes(); // once initially
    this.isSearch = isType(this.input.type, 'search');
    this.isPassword = isType(this.input.type, 'password');
    this.isWithinForm = isWithinForm(this.host);
    this.hasAction = hasLocateAction(this.actionIcon);
    this.hasCounter = hasCounterAndIsTypeText(this.input);
    this.isCounterVisible = this.showCharacterCount && this.hasCounter;
    this.hasUnit = !this.isCounterVisible && hasUnitAndIsTypeTextOrNumber(this.input, this.unit);
    if (this.isSearch) {
      this.isClearable = !!this.input.value;
      // detect programmatic value changes like it happens in frameworks
      propertyObserver.observeProperties(this.input, ['value'], () => (this.isClearable = !!this.input.value));
    }
  }
  componentDidLoad() {
    if (this.hasCounter) {
      validateProps.addInputEventListenerForCounter(this.input, this.ariaElement, this.isCounterVisible && this.unitOrCounterElement, this.setInputStyles);
    }
    else if (this.isSearch) {
      addInputEventListenerForSearch(this.input, (hasValue) => (this.isClearable = hasValue));
    }
  }
  componentDidRender() {
    // needs to happen after render in order to have unitOrCounterElement defined
    this.setInputStyles();
    /*
     * This is a workaround to improve accessibility because the input and the label/description/message text are placed in different DOM.
     * Referencing ID's from outside the component is impossible because the web component’s DOM is separate.
     * We have to wait for full support of the Accessibility Object Model (AOM) to provide the relationship between shadow DOM and slots
     */
    a11y.setAriaAttributes(this.input, {
      label: this.label,
      message: this.message || this.description,
      state: this.state,
    });
  }
  disconnectedCallback() {
    validateProps.unobserveAttributes(this.input);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    throwIfUnitLengthExceeded(this.unit);
    const { readOnly, disabled, type } = this.input;
    validateProps.attachComponentCss(this.host, getComponentCss, disabled, this.hideLabel, this.state, this.hasUnit || this.isCounterVisible, this.isCounterVisible ? 'suffix' : this.unitPosition, this.isPassword ? 'password' : type, this.isWithinForm, this.hasAction, this.hasAction && this.actionLoading);
    const disabledOrReadOnly = disabled || readOnly;
    const labelProps = {
      onClick: this.onLabelClick,
    };
    const iconProps = {
      color: 'inherit',
      'aria-hidden': 'true',
    };
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(validateProps.Host, null, validateProps.h("div", { class: "root" }, validateProps.h("label", { class: "label" }, required.hasLabel(this.host, this.label) && (validateProps.h("span", Object.assign({ class: "label__text" }, labelProps), this.label || validateProps.h("slot", { name: "label" }), isVisibleFormState.isRequiredAndParentNotRequired(this.host, this.input) && validateProps.h(required.Required, null))), hasDescription.hasDescription(this.host, this.description) && (validateProps.h("span", Object.assign({ class: "label__text label__text--description" }, labelProps), this.description || validateProps.h("slot", { name: "description" }))), (this.hasUnit || this.isCounterVisible) && (validateProps.h("span", Object.assign({ class: "unit" }, labelProps, { ref: (el) => (this.unitOrCounterElement = el), "aria-hidden": "true" }), this.unit)), validateProps.h("slot", null), this.hasCounter && validateProps.h("span", { class: "sr-only", ref: (el) => (this.ariaElement = el), "aria-live": "polite" })), this.isPassword ? (validateProps.h("button", { type: "button", onClick: this.togglePassword, disabled: disabled, "aria-pressed": this.showPassword ? 'true' : 'false' }, validateProps.h("span", { class: "sr-only" }, "Toggle password visibility"), validateProps.h(PrefixedTagNames.pIcon, Object.assign({ name: this.showPassword ? 'view-off' : 'view' }, iconProps)))) : (this.isSearch && [
      validateProps.h("button", { key: "btn-clear", type: "button", tabIndex: -1, hidden: !this.isClearable, disabled: disabledOrReadOnly, onClick: this.onClear }, validateProps.h(PrefixedTagNames.pIcon, Object.assign({ name: "close" }, iconProps))),
      this.hasAction && (validateProps.h("button", { key: "btn-action", type: "button", hidden: this.isClearable, disabled: disabledOrReadOnly, onClick: !this.actionLoading ? () => this.action.emit() : null }, validateProps.h("span", { class: "sr-only" }, "Locate me"), this.actionLoading ? (validateProps.h(PrefixedTagNames.pSpinner, { size: "inherit" })) : (
      // hardcoded locate icon
      validateProps.h(PrefixedTagNames.pIcon, Object.assign({ name: "locate" }, iconProps))))),
      this.isWithinForm ? (validateProps.h("button", { key: "btn-submit", type: "submit", disabled: disabledOrReadOnly, onClick: this.onSubmit }, validateProps.h("span", { class: "sr-only" }, "Search"), validateProps.h(PrefixedTagNames.pIcon, Object.assign({ name: "search" }, iconProps)))) : (validateProps.h(PrefixedTagNames.pIcon, Object.assign({ key: "icon", class: "icon", name: "search" }, iconProps))),
    ])), required.hasMessage(this.host, this.message, this.state) && (validateProps.h(required.StateMessage, { state: this.state, message: this.message, host: this.host }))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_text_field_wrapper = TextFieldWrapper;
