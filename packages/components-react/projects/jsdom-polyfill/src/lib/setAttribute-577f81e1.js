'use strict';

const setAttribute = (el, attributeName, attributeValue = '') => {
  el.setAttribute(attributeName, attributeValue);
};

exports.setAttribute = setAttribute;
