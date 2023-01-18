'use strict';

const textShared = require('./textShared-cdf909c4.js');
const fontSizeTextXSmall = require('./fontSizeTextXSmall-ad009c6d.js');

const textXSmallStyle = {
    font: `${textShared._textFontPartA}${fontSizeTextXSmall.fontSizeTextXSmall}${textShared._textFontPartB}`,
    ...textShared.fontHyphenationStyle,
};

exports.textXSmallStyle = textXSmallStyle;
