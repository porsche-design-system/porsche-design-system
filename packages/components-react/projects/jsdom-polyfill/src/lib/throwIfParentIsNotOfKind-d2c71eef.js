'use strict';

const isParentOfKind = require('./isParentOfKind-9c1048fd.js');
const validateProps = require('./validateProps-3b506a0d.js');

const throwIfParentIsNotOfKind = (element, tagName) => {
  if (element.parentElement && !isParentOfKind.isParentOfKind(element, tagName)) {
    const allowedTagName = validateProps.getPrefixedTagNames(element)[tagName];
    const actualTagName = validateProps.getTagName(element.parentElement);
    throw new Error(`Parent HTMLElement of ${validateProps.getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagName}`);
  }
};

exports.throwIfParentIsNotOfKind = throwIfParentIsNotOfKind;
