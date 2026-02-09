import {
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles-shared';

describe('getNotificationRootJssStyles()', () => {
  it.each<Parameters<typeof getNotificationRootJssStyle>>([
    ['info', false, false],
    ['info', true, false],
    ['info', true, true],
    ['info', false, true],
    ['success', false, false],
    ['error', false, false],
    ['warning', false, false],
    ['info', false, false],
    ['success', false, false],
    ['error', false, false],
    ['warning', false, false],
  ])('should return correct JssStyle for state: %s', (...args) => {
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
