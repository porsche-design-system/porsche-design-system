'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const getButtonBaseAriaAttributes = require('./get-button-base-aria-attributes-ba97ac40.js');
const buttonAriaAttributes = require('./button-aria-attributes-72e7209e.js');
const buttonHandling = require('./button-handling-a67b074a.js');
const theme = require('./theme-25a5ded7.js');
const linkButtonVariant = require('./link-button-variant-b6978694.js');
const a11y = require('./a11y-4587e563.js');
const linkButtonStyles = require('./link-button-styles-59666462.js');
require('./getClosestHTMLElement-883782e1.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');

const BUTTON_TYPES = ['button', 'submit', 'reset'];

const getButtonAriaAttributes = (isDisabled, isLoading, aria) => {
  return Object.assign(Object.assign({}, a11y.parseAndGetAriaAttributes(aria)), getButtonBaseAriaAttributes.getButtonBaseAriaAttributes(isDisabled, isLoading));
};

const getComponentCss = (variant, hideLabel, isDisabledOrLoading, theme) => {
  return validateProps.getCss(linkButtonStyles.getLinkButtonStyles(variant, hideLabel, isDisabledOrLoading, false, theme));
};

const propTypes = {
  type: validateProps.AllowedTypes.oneOf(BUTTON_TYPES),
  variant: validateProps.AllowedTypes.oneOf(linkButtonVariant.LINK_BUTTON_VARIANTS),
  tabbable: validateProps.AllowedTypes.boolean,
  disabled: validateProps.AllowedTypes.boolean,
  loading: validateProps.AllowedTypes.boolean,
  icon: validateProps.AllowedTypes.string,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  iconSource: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  aria: validateProps.AllowedTypes.aria(buttonAriaAttributes.BUTTON_ARIA_ATTRIBUTES),
};
const Button = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.tabbable = true;
    this.type = 'submit';
    this.disabled = false;
    this.loading = false;
    this.variant = 'secondary';
    this.icon = 'arrow-head-right';
    this.iconSource = undefined;
    this.hideLabel = false;
    this.theme = 'light';
    this.aria = undefined;
  }
  get isDisabledOrLoading() {
    return getButtonBaseAriaAttributes.isDisabledOrLoading(this.disabled, this.loading);
  }
  onClick(e) {
    if (this.isDisabledOrLoading) {
      e.stopPropagation();
    }
  }
  componentDidLoad() {
    buttonHandling.improveButtonHandlingForCustomElement(this.host, () => this.type, () => this.isDisabledOrLoading);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.variant, this.hideLabel, this.isDisabledOrLoading, this.theme);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    const iconProps = {
      class: 'icon',
      size: 'inherit',
    };
    return (validateProps.h("button", Object.assign({}, getButtonAriaAttributes(this.disabled, this.loading, this.aria), { class: "root", type: this.type, tabIndex: this.tabbable ? parseInt(this.host.getAttribute('tabindex'), 10) || null : -1 }), this.loading ? (validateProps.h(PrefixedTagNames.pSpinner, Object.assign({}, iconProps, { theme: this.variant === 'tertiary' ? this.theme : 'dark', aria: { 'aria-label': 'Loading state' } }))) : (validateProps.h(PrefixedTagNames.pIcon, Object.assign({}, iconProps, { name: this.icon, source: this.iconSource, color: "inherit", theme: this.variant === 'tertiary'
        ? this.theme
        : this.variant === 'secondary' && this.theme === 'dark'
          ? 'light'
          : 'dark', "aria-hidden": "true" }))), validateProps.h("span", null, validateProps.h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_button = Button;
