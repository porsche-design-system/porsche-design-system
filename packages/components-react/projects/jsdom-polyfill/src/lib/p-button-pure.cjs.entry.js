'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const getButtonBaseAriaAttributes = require('./get-button-base-aria-attributes-ba97ac40.js');
const buttonAriaAttributes = require('./button-aria-attributes-72e7209e.js');
const buttonHandling = require('./button-handling-a67b074a.js');
const linkButtonPureStyles = require('./link-button-pure-styles-471eb9a9.js');
const theme = require('./theme-25a5ded7.js');
const alignLabel = require('./align-label-ec43792c.js');
const textWeight = require('./text-weight-9b6bcbf7.js');
const a11y = require('./a11y-4587e563.js');
const fontVariant = require('./fontVariant-54ee1e6c.js');
require('./getClosestHTMLElement-883782e1.js');
require('./isParentOfKind-9c1048fd.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontSizeTextMedium-c20ab60d.js');
require('./fontSizeTextXLarge-991527e3.js');
require('./spacingStaticXSmall-0918e28c.js');
require('./borderWidthBase-2a045646.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');

const warnIfIsLoadingAndIconIsNone = (host, loading, iconName) => {
  if (loading && !linkButtonPureStyles.hasVisibleIcon(iconName)) {
    console.warn(`The combination of properties "icon='${iconName}'" and loading='${loading} within ${validateProps.getTagName(host)} is not supported.`);
  }
};
const getButtonPureAriaAttributes = (isDisabled, isLoading, aria) => {
  return Object.assign(Object.assign({}, a11y.parseAndGetAriaAttributes(aria)), getButtonBaseAriaAttributes.getButtonBaseAriaAttributes(isDisabled, isLoading));
};

const getComponentCss = (icon, active, isLoading, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, theme) => {
  const hasIcon = linkButtonPureStyles.hasVisibleIcon(icon);
  return validateProps.getCss(validateProps.mergeDeep(linkButtonPureStyles.getLinkButtonPureStyles(icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, false, theme), Object.assign({ root: {
      appearance: 'none',
      background: 'transparent',
      textAlign: 'left',
      border: 0,
      padding: 0,
      cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer',
    } }, (!hasIcon &&
    isLoading && {
    label: {
      visibility: 'hidden',
    },
    icon: {
      position: 'absolute',
      top: 0,
      left: `calc(50% - ${fontVariant.fontLineHeight} / 2)`,
      width: fontVariant.fontLineHeight,
      height: fontVariant.fontLineHeight,
    },
  }))));
};

const propTypes = {
  type: validateProps.AllowedTypes.oneOf(['button', 'submit', 'reset']),
  disabled: validateProps.AllowedTypes.boolean,
  loading: validateProps.AllowedTypes.boolean,
  size: validateProps.AllowedTypes.breakpoint(textWeight.TEXT_SIZES),
  weight: validateProps.AllowedTypes.oneOf(textWeight.TEXT_WEIGHTS),
  icon: validateProps.AllowedTypes.string,
  iconSource: validateProps.AllowedTypes.string,
  active: validateProps.AllowedTypes.boolean,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  alignLabel: validateProps.AllowedTypes.breakpoint(alignLabel.ALIGN_LABELS),
  stretch: validateProps.AllowedTypes.breakpoint('boolean'),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  aria: validateProps.AllowedTypes.aria(buttonAriaAttributes.BUTTON_ARIA_ATTRIBUTES),
};
const ButtonPure = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.type = 'submit';
    this.disabled = false;
    this.loading = false;
    this.size = 'small';
    this.weight = 'regular';
    this.icon = 'arrow-right';
    this.iconSource = undefined;
    this.active = false;
    this.hideLabel = false;
    this.alignLabel = 'right';
    this.stretch = false;
    this.theme = 'light';
    this.aria = undefined;
  }
  get isDisabledOrLoading() {
    return getButtonBaseAriaAttributes.isDisabledOrLoading(this.disabled, this.loading);
  }
  // this stops click events when button is disabled
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
    warnIfIsLoadingAndIconIsNone(this.host, this.loading, this.icon);
    linkButtonPureStyles.warnIfParentIsPTextAndIconIsNone(this.host, this.icon);
    validateProps.attachComponentCss(this.host, getComponentCss, this.icon, this.active, this.loading, this.isDisabledOrLoading, this.stretch, this.size, this.hideLabel, this.alignLabel, this.theme);
    const hasIcon = linkButtonPureStyles.hasVisibleIcon(this.icon);
    const iconProps = {
      class: 'icon',
      size: 'inherit',
      theme: this.theme,
    };
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h("button", Object.assign({}, getButtonPureAriaAttributes(this.disabled, this.loading, this.aria), { class: "root", type: this.type }), this.loading ? (validateProps.h(PrefixedTagNames.pSpinner, Object.assign({ aria: { 'aria-label': 'Loading state' } }, iconProps))) : (hasIcon && (validateProps.h(PrefixedTagNames.pIcon, Object.assign({}, iconProps, { color: "inherit", name: this.icon, source: this.iconSource, "aria-hidden": "true" })))), validateProps.h("span", { class: "label" }, validateProps.h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_button_pure = ButtonPure;
