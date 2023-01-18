'use strict';

const fontVariant = require('./fontVariant-54ee1e6c.js');
const validateProps = require('./validateProps-3b506a0d.js');

const fontHyphenationStyle = {
    overflowWrap: 'break-word',
    hyphens: 'auto',
};

const _textFontPartA = `${fontVariant.fontStyleNormal} ${fontVariant.fontVariant} ${validateProps.fontWeightRegular} `;
const _textFontPartB = `/${fontVariant.fontLineHeight} ${fontVariant.fontFamily}`;

exports._textFontPartA = _textFontPartA;
exports._textFontPartB = _textFontPartB;
exports.fontHyphenationStyle = fontHyphenationStyle;
