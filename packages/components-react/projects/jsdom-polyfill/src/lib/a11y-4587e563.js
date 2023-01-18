'use strict';

const validateProps = require('./validateProps-3b506a0d.js');
const removeAttribute = require('./removeAttribute-5be430c3.js');
const setAttribute = require('./setAttribute-577f81e1.js');

const setAriaAttributes = (el, opts) => {
  const { label, message, state } = opts;
  if (label) {
    setAttribute.setAttribute(el, 'aria-label', `${label}${message ? `. ${message}` : ''}`);
  }
  if (state === 'error') {
    setAttribute.setAttribute(el, 'aria-invalid', 'true');
  }
  else {
    removeAttribute.removeAttribute(el, 'aria-invalid');
  }
};
const parseAndGetAriaAttributes = (rawAttributes) => {
  if (rawAttributes) {
    const attributes = validateProps.parseJSONAttribute(rawAttributes);
    const attributeKeys = Object.keys(attributes);
    // convert booleans to strings so that values are properly set and not just result in attributes without a value when true in jsx
    for (const key of attributeKeys) {
      if (typeof attributes[key] === 'boolean') {
        attributes[key] = `${attributes[key]}`;
      }
    }
    return attributes;
  }
};

exports.parseAndGetAriaAttributes = parseAndGetAriaAttributes;
exports.setAriaAttributes = setAriaAttributes;
