'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const throwIfRootNodeIsNotOneOfKind = (element, tagNames) => {
  var _a;
  const shadowHost = (_a = element.getRootNode()) === null || _a === void 0 ? void 0 : _a.host;
  const actualTagName = shadowHost && validateProps.getTagName(shadowHost);
  const prefixedTagNames = validateProps.getPrefixedTagNames(element);
  const allowedTagNames = tagNames.map((tagName) => prefixedTagNames[validateProps.paramCaseToCamelCase(tagName)]);
  if (!allowedTagNames.includes(actualTagName)) {
    throw new Error(`${validateProps.getTagName(element)} can't be used like this`);
  }
};

exports.throwIfRootNodeIsNotOneOfKind = throwIfRootNodeIsNotOneOfKind;
