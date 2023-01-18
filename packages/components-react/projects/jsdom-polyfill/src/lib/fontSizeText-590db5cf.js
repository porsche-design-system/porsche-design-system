'use strict';

const fontSizeTextXSmall = require('./fontSizeTextXSmall-ad009c6d.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');
const fontSizeTextMedium = require('./fontSizeTextMedium-c20ab60d.js');
const fontSizeTextXLarge = require('./fontSizeTextXLarge-991527e3.js');

const fontSizeText = {
    xSmall: fontSizeTextXSmall.fontSizeTextXSmall,
    small: textSmallStyle.fontSizeTextSmall,
    medium: fontSizeTextMedium.fontSizeTextMedium,
    large: fontSizeTextXLarge.fontSizeTextLarge,
    xLarge: fontSizeTextXLarge.fontSizeTextXLarge,
};

exports.fontSizeText = fontSizeText;
