'use strict';

const textXSmallStyle = require('./textXSmallStyle-0148b295.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const textShared = require('./textShared-cdf909c4.js');
const fontSizeTextMedium = require('./fontSizeTextMedium-c20ab60d.js');
const fontSizeTextXLarge = require('./fontSizeTextXLarge-991527e3.js');

const textMediumStyle = {
    font: `${textShared._textFontPartA}${fontSizeTextMedium.fontSizeTextMedium}${textShared._textFontPartB}`,
    ...textShared.fontHyphenationStyle,
};

const textLargeStyle = {
    font: `${textShared._textFontPartA}${fontSizeTextXLarge.fontSizeTextLarge}${textShared._textFontPartB}`,
    ...textShared.fontHyphenationStyle,
};

const textXLargeStyle = {
    font: `${textShared._textFontPartA}${fontSizeTextXLarge.fontSizeTextXLarge}${textShared._textFontPartB}`,
    ...textShared.fontHyphenationStyle,
};

const textMap = {
  'x-small': textXSmallStyle.textXSmallStyle,
  small: textSmallStyle.textSmallStyle,
  medium: textMediumStyle,
  large: textLargeStyle,
  'x-large': textXLargeStyle,
};

const TEXT_ALIGNS = ['left', 'center', 'right'];

const getSlottedTypographyJssStyle = () => {
  return {
    margin: 'inherit',
    padding: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    color: 'inherit',
    textAlign: 'inherit',
    overflowWrap: 'inherit',
    wordWrap: 'inherit',
    hyphens: 'inherit',
    whiteSpace: 'inherit',
  };
};
const getEllipsisJssStyle = () => {
  return {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };
};

exports.TEXT_ALIGNS = TEXT_ALIGNS;
exports.getEllipsisJssStyle = getEllipsisJssStyle;
exports.getSlottedTypographyJssStyle = getSlottedTypographyJssStyle;
exports.textMap = textMap;
