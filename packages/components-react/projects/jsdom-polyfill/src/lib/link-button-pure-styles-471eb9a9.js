'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const isParentOfKind = require('./isParentOfKind-9c1048fd.js');
const fontSizeTextXSmall = require('./fontSizeTextXSmall-ad009c6d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const fontSizeTextMedium = require('./fontSizeTextMedium-c20ab60d.js');
const fontSizeTextXLarge = require('./fontSizeTextXLarge-991527e3.js');
const spacingStaticXSmall = require('./spacingStaticXSmall-0918e28c.js');
const borderWidthBase = require('./borderWidthBase-2a045646.js');
const fontVariant = require('./fontVariant-54ee1e6c.js');

const borderRadiusSmall = '4px';

const _frostedGlassBackgroundColor = 'rgba(14, 14, 18, 0.8)';

const backdropFilter = 'blur(8px)';
const frostedGlassMediumStyle = {
    backgroundColor: _frostedGlassBackgroundColor,
    WebkitBackdropFilter: backdropFilter,
    backdropFilter,
};

const hasVisibleIcon = (iconName) => {
  return iconName !== 'none';
};
const warnIfParentIsPTextAndIconIsNone = (host, iconName) => {
  if (!hasVisibleIcon(iconName) && isParentOfKind.isParentOfKind(host, 'p-text')) {
    console.warn(`${validateProps.getTagName(host)} should not be used inside p-text. Please use a <button> or <a> tag.`);
  }
};

const fontSizeTextMap = {
  'x-small': fontSizeTextXSmall.fontSizeTextXSmall,
  small: textSmallStyle.fontSizeTextSmall,
  medium: fontSizeTextMedium.fontSizeTextMedium,
  large: fontSizeTextXLarge.fontSizeTextLarge,
  'x-large': fontSizeTextXLarge.fontSizeTextXLarge,
  inherit: 'inherit',
};
const getFontSizeText = (size) => {
  return fontSizeTextMap[size];
};

// Needed for slotted anchor and hidden label, which then enlarges the hidden label to equal host size and indents the text to be visually hidden.
const getVisibilityJssStyle = (hideLabel) => {
  return hideLabel
    ? Object.assign(Object.assign({ position: 'absolute' }, validateProps.getInsetJssStyle(0)), { whiteSpace: 'nowrap', textIndent: '-999999px' }) : Object.assign(Object.assign({ position: 'relative' }, validateProps.getInsetJssStyle('auto')), { whiteSpace: 'inherit', textIndent: 0 });
};
const offsetVertical = '-2px';
const offsetHorizontal = '-4px';
const getLinkButtonPureStyles = (icon, active, isDisabledOrLoading, stretch, size, hideLabel, alignLabel, hasSlottedAnchor, theme) => {
  const { primaryColor, disabledColor, hoverColor, focusColor } = validateProps.getThemedColors(theme);
  const hasIcon = hasVisibleIcon(icon);
  return Object.assign({ '@global': {
      ':host': Object.assign(Object.assign({}, validateProps.addImportantToEachRule({
        transform: 'translate3d(0,0,0)',
        outline: 0, // custom element is able to delegate the focus
      })), validateProps.buildResponsiveStyles(stretch, (responsiveStretch) => (Object.assign({ display: responsiveStretch ? 'block' : 'inline-block' }, (!responsiveStretch && { verticalAlign: 'top' }))))),
    }, root: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ display: 'flex', gap: spacingStaticXSmall.spacingStaticXSmall, width: '100%', color: isDisabledOrLoading ? disabledColor : primaryColor, outline: 0 }, textSmallStyle.textSmallStyle), validateProps.mergeDeep(validateProps.buildResponsiveStyles(stretch, (stretchValue) => ({
      justifyContent: stretchValue ? 'space-between' : 'flex-start',
      alignItems: stretchValue ? 'center' : 'flex-start',
    })), validateProps.buildResponsiveStyles(size, (sizeValue) => ({
      fontSize: getFontSizeText(sizeValue),
    })))), { '&::before': Object.assign({ content: '""', position: 'fixed', top: offsetVertical, right: offsetHorizontal, bottom: offsetVertical, left: offsetHorizontal, borderRadius: borderRadiusSmall, transition: validateProps.getTransition('background-color') }, (active && Object.assign(Object.assign({}, frostedGlassMediumStyle), { backgroundColor: hoverColor }))) }), (!isDisabledOrLoading &&
      validateProps.hoverMediaQuery({
        '&:hover::before': Object.assign(Object.assign({}, frostedGlassMediumStyle), { backgroundColor: hoverColor }),
      }))), (!hasSlottedAnchor && {
      '&:focus::before': {
        border: `${borderWidthBase.borderWidthBase} solid ${focusColor}`,
      },
      '&:not(:focus-visible)::before': {
        border: 0,
      },
    })), label: {
      position: 'relative', // needed for hover state when icon="none" is set
    } }, (hasIcon && {
    icon: {
      position: 'relative',
      flexShrink: '0',
      width: fontVariant.fontLineHeight,
      height: fontVariant.fontLineHeight,
    },
    label: validateProps.mergeDeep(validateProps.buildResponsiveStyles(hideLabel, getVisibilityJssStyle), validateProps.buildResponsiveStyles(alignLabel, (alignLabelValue) => ({
      order: alignLabelValue === 'left' ? -1 : 0,
    }))),
  }));
};

exports.borderRadiusSmall = borderRadiusSmall;
exports.getLinkButtonPureStyles = getLinkButtonPureStyles;
exports.hasVisibleIcon = hasVisibleIcon;
exports.offsetHorizontal = offsetHorizontal;
exports.offsetVertical = offsetVertical;
exports.warnIfParentIsPTextAndIconIsNone = warnIfParentIsPTextAndIconIsNone;
