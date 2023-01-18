'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const a11y = require('./a11y-4587e563.js');
const theme = require('./theme-25a5ded7.js');
const throwIfInvalidLinkUsage = require('./throwIfInvalidLinkUsage-f03a0245.js');
const linkButtonVariant = require('./link-button-variant-b6978694.js');
const linkButtonStyles = require('./link-button-styles-59666462.js');
const linkUtils = require('./link-utils-ea33fbd4.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./transformSelectorToDirectChildSelector-f570e779.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');

const getComponentCss = (variant, hideLabel, hasSlottedAnchor, theme) => {
  return validateProps.getCss(linkButtonStyles.getLinkButtonStyles(variant, hideLabel, false, hasSlottedAnchor, theme));
};

const propTypes = {
  variant: validateProps.AllowedTypes.oneOf(linkButtonVariant.LINK_BUTTON_VARIANTS),
  icon: validateProps.AllowedTypes.string,
  iconSource: validateProps.AllowedTypes.string,
  href: validateProps.AllowedTypes.string,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  target: validateProps.AllowedTypes.string,
  download: validateProps.AllowedTypes.string,
  rel: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  aria: validateProps.AllowedTypes.aria(linkUtils.LINK_ARIA_ATTRIBUTES),
};
const Link = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.variant = 'secondary';
    this.icon = 'arrow-head-right';
    this.iconSource = undefined;
    this.href = undefined;
    this.theme = 'light';
    this.target = '_self';
    this.download = undefined;
    this.rel = undefined;
    this.hideLabel = false;
    this.aria = undefined;
  }
  componentWillLoad() {
    throwIfInvalidLinkUsage.throwIfInvalidLinkUsage(this.host, this.href);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.variant, this.hideLabel, !this.href, this.theme);
    const TagType = this.href === undefined ? 'span' : 'a';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(TagType, Object.assign({ class: "root" }, (TagType === 'a' && Object.assign({ href: this.href, target: this.target, download: this.download, rel: this.rel }, a11y.parseAndGetAriaAttributes(this.aria)))), validateProps.h(PrefixedTagNames.pIcon, { class: "icon", size: "inherit", name: this.icon, source: this.iconSource, color: "inherit", theme: this.variant === 'tertiary'
        ? this.theme
        : this.variant === 'secondary' && this.theme === 'dark'
          ? 'light'
          : 'dark', "aria-hidden": "true" }), validateProps.h("span", null, validateProps.h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_link = Link;
