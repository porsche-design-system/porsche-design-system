'use strict';

const validateProps = require('./validateProps-3b506a0d.js');

const getDataThemeDarkAttribute = (theme) => {
  return validateProps.isThemeDark(theme) ? { 'data-theme': 'dark' } : null;
};

exports.getDataThemeDarkAttribute = getDataThemeDarkAttribute;
