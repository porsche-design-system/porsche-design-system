'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const isParentOfKind = (element, tagName) => {
  const { parentElement } = element;
  return parentElement && validateProps.getTagNameWithoutPrefix(parentElement) === tagName;
};

exports.isParentOfKind = isParentOfKind;
