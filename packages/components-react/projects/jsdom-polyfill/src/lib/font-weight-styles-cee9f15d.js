'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

// 'thin' is deprecated and will be mapped to 'regular'
// 'semibold' is deprecated and will be mapped to 'semi-bold'
const fontWeightMap = {
  thin: validateProps.fontWeightRegular,
  regular: validateProps.fontWeightRegular,
  semibold: validateProps.fontWeightSemiBold,
  'semi-bold': validateProps.fontWeightSemiBold,
  bold: validateProps.fontWeightBold,
};
const getFontWeight = (weight) => {
  return fontWeightMap[weight];
};

exports.getFontWeight = getFontWeight;
