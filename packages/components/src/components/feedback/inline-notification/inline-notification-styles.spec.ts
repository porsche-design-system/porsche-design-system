import {
  getCloseIconStyle,
  getComponentCss,
  getNotificationContentStyle,
  getNotificationIconStyle,
  getNotificationRootStyle,
  getSlottedCss,
} from './inline-notification-styles';
import type { InlineNotificationState } from './inline-notification-utils';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['neutral', false, false, 'light'],
    ['warning', false, false, 'light'],
    ['success', false, false, 'light'],
    ['error', false, false, 'light'],
    ['neutral', true, false, 'light'],
    ['neutral', false, true, 'light'],
    ['neutral', true, true, 'light'],
    ['neutral', false, false, 'dark'],
    ['warning', false, false, 'dark'],
    ['success', false, false, 'dark'],
    ['error', false, false, 'dark'],
    ['neutral', true, false, 'dark'],
    ['neutral', false, true, 'dark'],
    ['neutral', true, true, 'dark'],
  ])('should return correct css for state: %s, hasAction: %s, hasClose: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-inline-notification');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-inline-notification');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('getNotificationRootStyles()', () => {
  it.each<Parameters<typeof getNotificationRootStyle>>([
    ['neutral', 'light'],
    ['success', 'light'],
    ['error', 'light'],
    ['warning', 'light'],
    ['neutral', 'dark'],
    ['success', 'dark'],
    ['error', 'dark'],
    ['warning', 'dark'],
  ])('should return correct JssStyle for state: %s and theme: %s', (...args) => {
    expect(getNotificationRootStyle(...args)).toMatchSnapshot();
  });
});

describe('getNotificationIconStyle()', () => {
  it.each<InlineNotificationState>(['neutral', 'success', 'error', 'warning'])(
    'should return correct JssStyle for state: %s ',
    (state) => {
      expect(getNotificationIconStyle(state)).toMatchSnapshot();
    }
  );
});

describe('getNotificationContentStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getNotificationContentStyle()).toMatchSnapshot();
  });
});

describe('getCloseIconStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getCloseIconStyle()).toMatchSnapshot();
  });
});
