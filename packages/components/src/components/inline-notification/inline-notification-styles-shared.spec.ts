import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';

describe('getNotificationRootJssStyles()', () => {
  it.each<Parameters<typeof getNotificationRootJssStyle>>([
    ['info', false, false, 'light'],
    ['info', true, false, 'light'],
    ['info', true, true, 'light'],
    ['info', false, true, 'light'],
    ['neutral', false, false, 'light'],
    ['success', false, false, 'light'],
    ['error', false, false, 'light'],
    ['warning', false, false, 'light'],
    ['info', false, false, 'dark'],
    ['neutral', false, false, 'dark'],
    ['success', false, false, 'dark'],
    ['error', false, false, 'dark'],
    ['warning', false, false, 'dark'],
  ])('should return correct JssStyle for state: %s and theme: %s', (...args) => {
    expect(getNotificationRootJssStyle(...args)).toMatchSnapshot();
  });
});

describe('getNotificationIconJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getNotificationIconJssStyle()).toMatchSnapshot();
  });
});

describe('getNotificationContentJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getNotificationContentJssStyle()).toMatchSnapshot();
  });
});
