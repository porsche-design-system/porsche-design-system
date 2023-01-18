'use strict';

const textShared = require('./textShared-cdf909c4.js');

const fontSizeTextSmall = '1rem';

const textSmallStyle = {
    font: `${textShared._textFontPartA}${fontSizeTextSmall}${textShared._textFontPartB}`,
    ...textShared.fontHyphenationStyle,
};

exports.fontSizeTextSmall = fontSizeTextSmall;
exports.textSmallStyle = textSmallStyle;
