'use strict';

function getHTMLElements(element, selector) {
  return element ? Array.from(element.querySelectorAll(selector)) : [];
}

exports.getHTMLElements = getHTMLElements;
