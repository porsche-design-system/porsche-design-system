'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const linkUtils = require('./link-utils-ea33fbd4.js');
const a11y = require('./a11y-4587e563.js');
const linkButtonPureStyles = require('./link-button-pure-styles-471eb9a9.js');
const theme = require('./theme-25a5ded7.js');
const throwIfInvalidLinkUsage = require('./throwIfInvalidLinkUsage-f03a0245.js');
const alignLabel = require('./align-label-ec43792c.js');
const textWeight = require('./text-weight-9b6bcbf7.js');
const borderWidthBase = require('./borderWidthBase-2a045646.js');
require('./removeAttribute-5be430c3.js');
require('./setAttribute-577f81e1.js');
require('./isParentOfKind-9c1048fd.js');
require('./fontSizeTextXSmall-ad009c6d.js');
require('./textSmallStyle-305ec8fc.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');
require('./fontSizeTextMedium-c20ab60d.js');
require('./fontSizeTextXLarge-991527e3.js');
require('./spacingStaticXSmall-0918e28c.js');
require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./transformSelectorToDirectChildSelector-f570e779.js');

const getComponentCss = (icon, active, stretch, size, hideLabel, alignLabel, underline, hasSlottedAnchor, theme) => {
  const { focusColor } = validateProps.getThemedColors(theme);
  return validateProps.getCss(validateProps.mergeDeep(linkButtonPureStyles.getLinkButtonPureStyles(icon, active, false, stretch, size, hideLabel, alignLabel, hasSlottedAnchor, theme), Object.assign(Object.assign({}, (hasSlottedAnchor && {
    '@global': validateProps.addImportantToEachRule({
      '::slotted': {
        '&(a)': {
          outline: 0,
          textDecoration: underline ? 'underline' : 'none',
          font: 'inherit',
          color: 'inherit',
        },
        // The clickable area for Safari < ~15 (<= release date: 2021-10-28) is reduced to the slotted anchor itself,
        // since Safari prior to this major release does not support pseudo-elements in the slotted context
        // (https://bugs.webkit.org/show_bug.cgi?id=178237)
        '&(a)::before': {
          content: '""',
          position: 'fixed',
          top: linkButtonPureStyles.offsetVertical,
          right: linkButtonPureStyles.offsetHorizontal,
          bottom: linkButtonPureStyles.offsetVertical,
          left: linkButtonPureStyles.offsetHorizontal,
          borderRadius: linkButtonPureStyles.borderRadiusSmall,
        },
        '&(a:focus)::before': {
          border: `${borderWidthBase.borderWidthBase} solid ${focusColor}`,
        },
        '&(a:focus:not(:focus-visible))::before': {
          border: 0,
        },
      },
    }),
  })), { root: {
      textDecoration: underline ? 'underline' : 'none',
    } })));
};

const propTypes = {
  alignLabel: validateProps.AllowedTypes.breakpoint(alignLabel.ALIGN_LABELS),
  stretch: validateProps.AllowedTypes.breakpoint('boolean'),
  size: validateProps.AllowedTypes.breakpoint(textWeight.TEXT_SIZES),
  weight: validateProps.AllowedTypes.oneOf(textWeight.TEXT_WEIGHTS),
  icon: validateProps.AllowedTypes.string,
  iconSource: validateProps.AllowedTypes.string,
  underline: validateProps.AllowedTypes.boolean,
  href: validateProps.AllowedTypes.string,
  active: validateProps.AllowedTypes.boolean,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  target: validateProps.AllowedTypes.string,
  download: validateProps.AllowedTypes.string,
  rel: validateProps.AllowedTypes.string,
  aria: validateProps.AllowedTypes.aria(linkUtils.LINK_ARIA_ATTRIBUTES),
};
const LinkPure = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.alignLabel = 'right';
    this.stretch = false;
    this.size = 'small';
    this.weight = 'regular';
    this.icon = 'arrow-right';
    this.iconSource = undefined;
    this.underline = false;
    this.href = undefined;
    this.active = false;
    this.hideLabel = false;
    this.theme = 'light';
    this.target = '_self';
    this.download = undefined;
    this.rel = undefined;
    this.aria = undefined;
  }
  componentWillLoad() {
    throwIfInvalidLinkUsage.throwIfInvalidLinkUsage(this.host, this.href);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    linkButtonPureStyles.warnIfParentIsPTextAndIconIsNone(this.host, this.icon);
    validateProps.attachComponentCss(this.host, getComponentCss, this.icon, this.active, this.stretch, this.size, this.hideLabel, this.alignLabel, this.underline, !this.href, this.theme);
    const TagType = this.href === undefined ? 'span' : 'a';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(TagType, Object.assign({ class: "root" }, (TagType === 'a' && Object.assign({ href: this.href, target: this.target, download: this.download, rel: this.rel }, a11y.parseAndGetAriaAttributes(this.aria)))), linkButtonPureStyles.hasVisibleIcon(this.icon) && (validateProps.h(PrefixedTagNames.pIcon, { class: "icon", color: "inherit", theme: this.theme, size: "inherit", name: this.icon, source: this.iconSource, "aria-hidden": "true" })), validateProps.h("span", { class: "label" }, validateProps.h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_link_pure = LinkPure;
