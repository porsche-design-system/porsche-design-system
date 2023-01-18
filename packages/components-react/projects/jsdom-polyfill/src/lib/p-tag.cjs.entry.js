'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const tagStyles = require('./tag-styles-8a16293d.js');
const transformSelectorToDirectChildSelector = require('./transformSelectorToDirectChildSelector-f570e779.js');
const theme = require('./theme-25a5ded7.js');
require('./textXSmallStyle-0148b295.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./fontStyleItalic-33c41474.js');

/* eslint-disable prefer-arrow/prefer-arrow-functions */
function getDirectChildHTMLElement(element, selector) {
  // querySelector(All) doesn't work with :scope pseudo class and comma separator in jsdom, yet
  // https://github.com/jsdom/jsdom/issues/3141
  // therefore we got a workaround so it works nicely when consumed from jsdom-polyfill package
  return (transformSelectorToDirectChildSelector.transformSelectorToDirectChildSelector(selector)
    .split(',')
    .map((sel) => validateProps.getHTMLElement(element, sel))
    .filter((x) => x)[0] || null // comma separated selector might return null, so we have to filter
  );
}

const propTypes = {
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  color: validateProps.AllowedTypes.oneOf(tagStyles.TAG_COLORS),
  icon: validateProps.AllowedTypes.string,
  iconSource: validateProps.AllowedTypes.string,
};
const Tag = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.theme = 'light';
    this.color = 'background-surface';
    this.icon = undefined;
    this.iconSource = undefined;
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, tagStyles.getComponentCss, this.color, !!getDirectChildHTMLElement(this.host, 'a,button'), this.theme);
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h("span", null, (this.icon || this.iconSource) && (validateProps.h(PrefixedTagNames.pIcon, { class: "icon", name: this.icon, source: this.iconSource, color: "inherit", theme: this.theme, "aria-hidden": "true" })), validateProps.h("div", null, validateProps.h("slot", null))));
  }
  get host() { return validateProps.getElement(this); }
};

exports.p_tag = Tag;
