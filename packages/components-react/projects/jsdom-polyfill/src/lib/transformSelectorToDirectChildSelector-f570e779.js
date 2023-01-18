'use strict';

const transformSelectorToDirectChildSelector = (selector) => selector
  .split(',')
  .map((part) => ':scope>' + part)
  .join();

exports.transformSelectorToDirectChildSelector = transformSelectorToDirectChildSelector;
