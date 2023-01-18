'use strict';

const headingShared = require('./headingShared-3815cda4.js');
const textSmallStyle = require('./textSmallStyle-305ec8fc.js');

const fontSizeHeadingSmall = textSmallStyle.fontSizeTextSmall;

const headingSmallStyle = {
    font: `${headingShared._headingFontPartA}${fontSizeHeadingSmall}${headingShared._headingFontPartB}`,
};

exports.headingSmallStyle = headingSmallStyle;
