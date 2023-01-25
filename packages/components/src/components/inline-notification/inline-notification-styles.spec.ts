import {
  getCloseIconJssStyle,
  getComponentCss,
  getNotificationContentJssStyle,
  getNotificationIconJssStyle,
  getNotificationRootJssStyle,
} from './inline-notification-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['info', false, false, 'light'],
    ['neutral', false, false, 'light'],
    ['warning', false, false, 'light'],
    ['success', false, false, 'light'],
    ['error', false, false, 'light'],
    ['info', true, false, 'light'],
    ['info', false, true, 'light'],
    ['info', true, true, 'light'],
    ['info', false, false, 'dark'],
    ['neutral', true, false, 'light'],
    ['neutral', false, true, 'light'],
    ['neutral', true, true, 'light'],
    ['neutral', false, false, 'dark'],
    ['warning', false, false, 'dark'],
    ['success', false, false, 'dark'],
    ['error', false, false, 'dark'],
    ['info', true, false, 'dark'],
    ['info', false, true, 'dark'],
    ['info', true, true, 'dark'],
    ['neutral', true, false, 'dark'],
    ['neutral', false, true, 'dark'],
    ['neutral', true, true, 'dark'],
  ])('should return correct css for state: %s, hasAction: %s, hasClose: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});

describe('getNotificationRootJssStyles()', () => {
  it.each<Parameters<typeof getNotificationRootJssStyle>>([
    ['info', 'light'],
    ['neutral', 'light'],
    ['success', 'light'],
    ['error', 'light'],
    ['warning', 'light'],
    ['info', 'dark'],
    ['neutral', 'dark'],
    ['success', 'dark'],
    ['error', 'dark'],
    ['warning', 'dark'],
  ])('should return correct JssStyle for state: %s and theme: %s', (...args) => {
    expect(getNotificationRootJssStyle(...args)).toMatchSnapshot();
  });
});

describe('getNotificationIconJssStyle()', () => {
  it.each<Parameters<typeof getNotificationIconJssStyle>>([
    ['info', 'light'],
    ['neutral', 'light'],
    ['success', 'light'],
    ['error', 'light'],
    ['warning', 'light'],
    ['info', 'dark'],
    ['neutral', 'dark'],
    ['success', 'dark'],
    ['error', 'dark'],
    ['warning', 'dark'],
  ])('should return correct JssStyle for state: %s and theme: %s', (...args) => {
    expect(getNotificationIconJssStyle(...args)).toMatchSnapshot();
  });
});

describe('getNotificationContentJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getNotificationContentJssStyle()).toMatchSnapshot();
  });
});

describe('getCloseIconJssStyle()', () => {
  it('should return correct JssStyle', () => {
    expect(getCloseIconJssStyle()).toMatchSnapshot();
  });
});
