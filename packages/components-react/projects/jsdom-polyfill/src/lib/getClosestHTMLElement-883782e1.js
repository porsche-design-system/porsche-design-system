'use strict';

/* eslint-disable prefer-arrow/prefer-arrow-functions */
function getClosestHTMLElement(element, selector) {
  return element === null || element === void 0 ? void 0 : element.closest(selector);
}

exports.getClosestHTMLElement = getClosestHTMLElement;
