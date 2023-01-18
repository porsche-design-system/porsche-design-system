'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const tagStyles = require('./tag-styles-8a16293d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./textXSmallStyle-0148b295.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./fontStyleItalic-33c41474.js');

const getComponentCss = (color, hasLabel) => {
  const themedColors = validateProps.getThemedColors('light');
  const { primaryColor, hoverColor, contrastMediumColor } = themedColors;
  const backgroundColor = tagStyles.getThemedBackgroundColor(color, themedColors);
  return validateProps.getCss(Object.assign(Object.assign({ '@global': {
      ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: validateProps.addImportantToRule(0),
      },
      button: Object.assign(Object.assign(Object.assign(Object.assign({ position: 'relative', minHeight: validateProps.pxToRemWithUnit(48), padding: `${validateProps.pxToRemWithUnit(4)} ${validateProps.pxToRemWithUnit(46)} ${validateProps.pxToRemWithUnit(4)} ${validateProps.pxToRemWithUnit(16)}`, borderRadius: validateProps.pxToRemWithUnit(4), border: 0, cursor: 'pointer', background: backgroundColor, color: primaryColor, textAlign: 'left' }, textSmallStyle.textSmallStyle), { outline: 0 }), tagStyles.getTagFocusJssStyle(primaryColor, hoverColor)), validateProps.hoverMediaQuery({
        '&:hover > .icon': {
          color: hoverColor,
        },
      })),
      '::slotted': validateProps.addImportantToEachRule(tagStyles.slottedTextJssStyle),
    } }, (hasLabel && {
    label: {
      display: 'block',
      marginBottom: validateProps.pxToRemWithUnit(-4),
      color: contrastMediumColor,
      fontSize: validateProps.pxToRemWithUnit(14),
      // a custom line-height is needed to have 48px height in total when label + slotted text is used
      lineHeight: validateProps.pxToRemWithUnit(20),
    },
  })), { icon: {
      position: 'absolute',
      top: '50%',
      right: validateProps.pxToRemWithUnit(12),
      transform: 'translate3d(0, -50%, 0)',
      transition: validateProps.getTransition('color'),
    }, 'sr-only': validateProps.getScreenReaderOnlyJssStyle() }));
};

const propTypes = {
  color: validateProps.AllowedTypes.oneOf(tagStyles.TAG_COLORS),
  label: validateProps.AllowedTypes.string,
  aria: validateProps.AllowedTypes.aria(tagStyles.TAG_DISMISSIBLE_ARIA_ATTRIBUTES),
};
const TagDismissible = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.color = 'background-surface';
    this.label = undefined;
    this.aria = undefined;
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.color, !!this.label);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h("button", Object.assign({ type: "button" }, a11y.parseAndGetAriaAttributes(this.aria)), validateProps.h("span", { class: "sr-only" }, "Remove:"), this.label && validateProps.h("span", { class: "label" }, this.label), validateProps.h("slot", null), validateProps.h(PrefixedTagNames.pIcon, { class: "icon", name: "close", color: "inherit", "aria-hidden": "true" })));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_tag_dismissible = TagDismissible;
