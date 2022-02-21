import type { JssStyle } from 'jss';

// inspired by https://www.abeautifulsite.net/posts/testing-support-for-focus-visible/
export const supportsFocusVisible = (): boolean => {
  let isSupported = true;
  const style = document.createElement('style');
  document.head.appendChild(style);

  try {
    style.sheet.insertRule(':focus-visible{}');
  } catch (e) {
    isSupported = false;
  } finally {
    style.remove();
  }

  return isSupported;
};

const hasFocusVisibleSupport = supportsFocusVisible();
// getter for easy mocking
export const getHasFocusVisibleSupport = (): boolean => hasFocusVisibleSupport;

// TODO: remove fallback once :focus-visible is supported by safari
export const getFocusVisibleFallback = (style: JssStyle): JssStyle =>
  getHasFocusVisibleSupport() ? style : { outline: 0 };
