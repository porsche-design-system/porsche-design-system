'use strict';

require('./validateProps-3b506a0d.js');
const hasDocument = require('./has-document-f0620e06.js');

// inspired by https://www.abeautifulsite.net/posts/testing-support-for-focus-visible/
const supportsFocusVisible = () => {
  let isSupported = true;
  const style = document.createElement('style');
  document.head.appendChild(style);
  try {
    style.sheet.insertRule(':focus-visible{}');
  }
  catch (e) {
    isSupported = false;
  }
  finally {
    style.remove();
  }
  return isSupported;
};
const hasFocusVisibleSupport = hasDocument.hasDocument && supportsFocusVisible();
// getter for easy mocking
const getHasFocusVisibleSupport = () => hasFocusVisibleSupport;
// TODO: remove fallback once :focus-visible is supported by safari
const getFocusVisibleFallback = (style) => getHasFocusVisibleSupport() ? style : { outline: 0 };

exports.getFocusVisibleFallback = getFocusVisibleFallback;
