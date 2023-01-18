'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const validateProps = require('./validateProps-3b506a0d.js');
const theme = require('./theme-25a5ded7.js');
const throwIfInvalidLinkUsage = require('./throwIfInvalidLinkUsage-f03a0245.js');
const linkButtonStyles = require('./link-button-styles-59666462.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
require('./getOnlyChildOfKindHTMLElementOrThrow-65ea732e.js');
require('./getHTMLElements-d3d6e3ec.js');
require('./transformSelectorToDirectChildSelector-f570e779.js');
require('./textShared-cdf909c4.js');
require('./fontVariant-54ee1e6c.js');

const { contrastHighColor: themeLightContrastHighColor, primaryColor: themeLightBaseColor } = validateProps.getThemedColors('light');
const { primaryColor: themeDarkBaseColor } = validateProps.getThemedColors('dark');
const getColors = (icon, theme) => {
  const isDarkTheme = validateProps.isThemeDark(theme);
  const { primaryColor, primaryColorDarken, contrastHighColorDarken } = validateProps.getThemedColors(theme);
  const externalBrandColor = primaryColor;
  return {
    baseColor: isDarkTheme ? themeDarkBaseColor : themeLightContrastHighColor,
    baseColorHover: externalBrandColor || (isDarkTheme ? primaryColorDarken : contrastHighColorDarken),
    textColor: isDarkTheme ? themeLightBaseColor : themeDarkBaseColor,
    textColorHover: icon === 'logo-kakaotalk' ? themeLightBaseColor : externalBrandColor ? themeDarkBaseColor : undefined,
  };
};
const getComponentCss = (icon, hideLabel, hasHref, theme) => {
  const { baseColor, baseColorHover, textColor, textColorHover } = getColors(icon, theme);
  return validateProps.getCss({
    '@global': Object.assign(Object.assign({ ':host': {
        display: 'inline-flex',
        verticalAlign: 'top',
        outline: validateProps.addImportantToRule(0),
      } }, (!hasHref && {
      '::slotted': validateProps.addImportantToEachRule(Object.assign(Object.assign({ '&(a)': Object.assign({ display: 'block', textDecoration: 'none', color: 'inherit', lineHeight: 'inherit', outline: 'transparent solid 1px', outlineOffset: '3px' }, validateProps.buildResponsiveStyles(hideLabel, linkButtonStyles.getSlottedLinkJssStyle)), 
        // TODO: combine link-social-styles with link-button-styles and tabs-bar-styles
        '&(a::-moz-focus-inner)': {
          border: 0,
        }, '&(a:focus)': {
          outlineColor: baseColor,
        } }, validateProps.hoverMediaQuery({
        '&(a:hover:focus)': {
          outlineColor: baseColorHover,
        },
      })), { '&(a:focus:not(:focus-visible))': {
          outlineColor: 'transparent',
        } })),
    })), { span: Object.assign(Object.assign({ display: 'block', width: '100%', color: textColor }, textSmallStyle.textSmallStyle), (hasHref && validateProps.buildResponsiveStyles(hideLabel, linkButtonStyles.getLabelJssStyle))) }),
    root: Object.assign(Object.assign({ display: 'flex', width: '100%', minWidth: validateProps.pxToRemWithUnit(48), minHeight: validateProps.pxToRemWithUnit(48), position: 'relative', margin: 0, padding: 0, boxSizing: 'border-box', outline: 'transparent none', appearance: 'none', cursor: 'pointer', textDecoration: 'none', textAlign: 'left', border: '1px solid currentColor', backgroundColor: 'currentColor', color: baseColor, transition: validateProps.getTransition('background-color') + ',' + validateProps.getTransition('border-color') + ',' + validateProps.getTransition('color') }, validateProps.hoverMediaQuery({
      '&:hover, &:active': {
        color: baseColorHover,
        '& span, & $icon': {
          color: textColorHover,
        },
      },
    })), (hasHref && Object.assign(Object.assign({}, validateProps.buildResponsiveStyles(hideLabel, linkButtonStyles.getRootJssStyle)), validateProps.getFocusJssStyle()))),
    icon: Object.assign({ position: 'absolute', width: validateProps.pxToRemWithUnit(24), height: validateProps.pxToRemWithUnit(24), color: textColor, pointerEvents: 'none' }, validateProps.buildResponsiveStyles(hideLabel, linkButtonStyles.getIconJssStyle)),
  });
};

const propTypes = {
  icon: validateProps.AllowedTypes.string,
  iconSource: validateProps.AllowedTypes.string,
  href: validateProps.AllowedTypes.string,
  theme: validateProps.AllowedTypes.oneOf(theme.THEMES),
  target: validateProps.AllowedTypes.string,
  rel: validateProps.AllowedTypes.string,
  hideLabel: validateProps.AllowedTypes.breakpoint('boolean'),
};
const LinkSocial = class {
  constructor(hostRef) {
    validateProps.registerInstance(this, hostRef);
    this.icon = undefined;
    this.iconSource = undefined;
    this.href = undefined;
    this.theme = 'light';
    this.target = '_self';
    this.rel = undefined;
    this.hideLabel = false;
  }
  componentWillLoad() {
    throwIfInvalidLinkUsage.throwIfInvalidLinkUsage(this.host, this.href);
  }
  render() {
    validateProps.validateProps(this, propTypes);
    validateProps.attachComponentCss(this.host, getComponentCss, this.icon, this.hideLabel, !!this.href, this.theme);
    const TagType = this.href === undefined ? 'span' : 'a';
    const PrefixedTagNames = validateProps.getPrefixedTagNames(this.host);
    return (validateProps.h(TagType, Object.assign({ class: "root" }, (TagType === 'a' && {
      href: this.href,
      target: this.target,
      rel: this.rel,
    })), validateProps.h(PrefixedTagNames.pIcon, { class: "icon", size: "inherit", name: this.icon, source: this.iconSource, color: "inherit", theme: this.theme === 'light' ? 'dark' : 'light', "aria-hidden": "true" }), validateProps.h("span", null, validateProps.h("slot", null))));
  }
  static get delegatesFocus() { return true; }
  get host() { return validateProps.getElement(this); }
};

exports.p_link_social = LinkSocial;
