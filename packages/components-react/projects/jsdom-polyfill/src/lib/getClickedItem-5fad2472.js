'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const updateParent = (host) => {
  validateProps.forceUpdate(host.parentElement);
};

const areAllChildrenOfKind = (element, tagName) => {
  const children = Array.from(element.children);
  const prefixedElementTagName = validateProps.getPrefixedTagNames(element)[validateProps.paramCaseToCamelCase(tagName)];
  return !children.some((child) => validateProps.getTagName(child) !== prefixedElementTagName);
};

const throwIfChildrenAreNotOfKind = (element, tagName) => {
  if (!areAllChildrenOfKind(element, tagName)) {
    const allowedTagName = validateProps.getPrefixedTagNames(element)[validateProps.paramCaseToCamelCase(tagName)];
    const actualTagNames = Array.from(element.children)
      .map((child) => validateProps.getTagName(child))
      .filter((actualTagName) => actualTagName !== allowedTagName)
      .join(', ');
    throw new Error(`Child HTMLElements of ${validateProps.getTagName(element)} should be of kind ${allowedTagName} but got ${actualTagNames}`);
  }
};

const getClickedItem = (host, tagName, targets) => {
  const item = validateProps.getPrefixedTagNames(host)[validateProps.paramCaseToCamelCase(tagName)];
  return targets.find((x) => { var _a; return ((_a = x.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === item; });
};

exports.getClickedItem = getClickedItem;
exports.throwIfChildrenAreNotOfKind = throwIfChildrenAreNotOfKind;
exports.updateParent = updateParent;
