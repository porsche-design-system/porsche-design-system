'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const getButtonBaseAriaAttributes = require('./get-button-base-aria-attributes-ba97ac40.js');
const buttonHandling = require('./button-handling-a67b074a.js');
const theme = require('./theme-25a5ded7.js');
const alignLabel = require('./align-label-ec43792c.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const spacingStaticSmall = require('./spacingStaticSmall-267058b5.js');
require('./getClosestHTMLElement-883782e1.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');

const getColors = (checked, isDisabledOrLoading, theme) => {
  const { backgroundColor, primaryColor, contrastHighColor, successColor, successColorDarken, disabledColor } = validateProps.getThemedColors(theme);
  const { backgroundColor: lightThemeBackgroundColor } = validateProps.getThemedColors('light');
  const checkedColor = successColor;
  const disabledOrLoadingColor = isDisabledOrLoading && disabledColor;
  return {
    backgroundColor,
    buttonBorderColor: disabledOrLoadingColor || (checked ? checkedColor : contrastHighColor),
    buttonBorderColorHover: checked ? successColorDarken : primaryColor,
    buttonBackgroundColor: checked ? disabledOrLoadingColor || checkedColor : 'transparent',
    buttonBackgroundColorHover: checked ? successColorDarken : 'transparent',
    toggleBackgroundColor: (!checked && disabledOrLoadingColor) || (checked ? lightThemeBackgroundColor : contrastHighColor),
    toggleBackgroundColorHover: checked ? lightThemeBackgroundColor : primaryColor,
    textColor: disabledOrLoadingColor || primaryColor,
  };
};
const getAlignLabelJssStyle = (alignLabel) => {
  const styles = {
    left: {
      order: 0,
      paddingLeft: 0,
      paddingRight: spacingStaticSmall.spacingStaticSmall,
    },
    right: {
      order: 1,
      paddingLeft: spacingStaticSmall.spacingStaticSmall,
      paddingRight: 0,
    },
  };
  return styles[alignLabel];
};
const getStretchJssStyle = (stretch) => {
  return stretch
    ? {
      width: '100%',
      justifyContent: 'space-between',
    }
    : {
      width: 'auto',
      justifyContent: 'flex-start',
    };
};
const getComponentCss = (alignLabel, hideLabel, stretch, checked, loading, isDisabledOrLoading, theme) => {
  const { backgroundColor, buttonBorderColor, buttonBorderColorHover, buttonBackgroundColor, buttonBackgroundColorHover, toggleBackgroundColor, toggleBackgroundColorHover, textColor, } = getColors(checked, isDisabledOrLoading, theme);
  return validateProps.getCss(Object.assign({ '@global': {
      ':host': validateProps.addImportantToEachRule({
        display: 'flex',
        outline: 0,
      }),
      button: Object.assign(Object.assign({ position: 'relative', width: validateProps.pxToRemWithUnit(48), height: validateProps.pxToRemWithUnit(24), flexShrink: 0, display: 'block', margin: 0, padding: 0, appearance: 'none', boxSizing: 'border-box', color: buttonBorderColor, border: '1px solid currentColor', borderRadius: validateProps.pxToRemWithUnit(12), backgroundColor: buttonBackgroundColor, outline: 'none', cursor: isDisabledOrLoading ? 'not-allowed' : 'pointer', transition: `${validateProps.getTransition('background-color')},${validateProps.getTransition('border-color')},${validateProps.getTransition('color')}` }, (!isDisabledOrLoading &&
        validateProps.hoverMediaQuery({
          '&:hover': {
            color: buttonBorderColorHover,
            backgroundColor: buttonBackgroundColorHover,
            '& .toggle': {
              backgroundColor: toggleBackgroundColorHover,
            },
          },
        }))), { '&:focus': {
          boxShadow: `0 0 0 2px ${backgroundColor}, 0 0 0 3px currentColor`,
        }, '&:not(:focus-visible)': {
          boxShadow: 'none',
        } }),
    }, root: Object.assign({ display: 'flex', minWidth: 0, minHeight: 0, cursor: isDisabledOrLoading ? 'auto' : 'pointer' }, validateProps.buildResponsiveStyles(stretch, getStretchJssStyle)), text: Object.assign(Object.assign(Object.assign({}, textSmallStyle.textSmallStyle), { minWidth: 0, minHeight: 0, color: textColor }), validateProps.mergeDeep(validateProps.buildResponsiveStyles(alignLabel, getAlignLabelJssStyle), validateProps.buildResponsiveStyles(hideLabel, validateProps.getTextHiddenJssStyle))), toggle: {
      position: 'absolute',
      top: validateProps.pxToRemWithUnit(2),
      left: validateProps.pxToRemWithUnit(2),
      width: validateProps.pxToRemWithUnit(18),
      height: validateProps.pxToRemWithUnit(18),
      display: 'block',
      borderRadius: '50%',
      backgroundColor: toggleBackgroundColor,
      transform: `translate3d(${checked ? validateProps.pxToRemWithUnit(24) : '0'}, 0, 0)`,
      transition: `${validateProps.getTransition('background-color')},${validateProps.getTransition('transform')}`,
    } }, (loading && {
    spinner: {
      position: 'absolute',
      top: validateProps.pxToRemWithUnit(-3),
      left: validateProps.pxToRemWithUnit(-3),
      width: validateProps.pxToRemWithUnit(24),
      height: validateProps.pxToRemWithUnit(24),
    },
  })));
};

const getSwitchButtonAriaAttributes = (isDisabled, isLoading, isChecked) => {
  return Object.assign(Object.assign({}, getButtonBaseAriaAttributes.getButtonBaseAriaAttributes(isDisabled, isLoading)), { 'aria-checked': isChecked ? 'true' : 'false', 'aria-labelledby': 'label' });
};

const propTypes = {
  alignLabel: validateProps.AllowedTypes.breakpoint(alignLabel.ALIGN_LABELS),
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  stretch: validateProps.AllowedTypes.breakpoint('boolean'),
  checked: validateProps.AllowedTypes.boolean,
  disabled: validateProps.AllowedTypes.boolean,
  loading: validateProps.AllowedTypes.boolean,
  tabbable: validateProps.AllowedTypes.boolean,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
};
const Switch = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.switchChange = validateProps.createEvent(this, "switchChange", 3);
    this.onSwitchClick = () => {
      this.switchChange.emit({ checked: !this.checked });
    };
    this.alignLabel = 'right';
    this.hideLabel = false;
    this.stretch = false;
    this.checked = false;
    this.disabled = false;
    this.loading = false;
    this.tabbable = true;
    this.theme = 'light';
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
    buttonHandling.improveButtonHandlingForCustomElement(this.host, () => 'button', () => this.isDisabledOrLoading);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.alignLabel, this.hideLabel, this.stretch, this.checked, this.loading, this.isDisabledOrLoading, this.theme);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h("label", { class: "root" }, validateProps.h("span", { id: "label", class: "text" }, validateProps.h("slot", null)), validateProps.h("button", Object.assign({}, getSwitchButtonAriaAttributes(this.disabled, this.loading, this.checked), { type: "button", role: "switch", tabIndex: this.tabbable ? parseInt(this.host.getAttribute('tabindex'), 10) || null : -1, onClick: this.onSwitchClick }), validateProps.h("span", { class: "toggle" }, this.loading && (validateProps.h(PrefixedTagNames.pSpinner, { class: "spinner", size: "inherit", theme: this.checked ? 'light' : 'dark', aria: { 'aria-label': 'Loading state' } }))))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_switch = Switch;
