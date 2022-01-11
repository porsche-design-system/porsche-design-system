import {
  getCloseIconStyles,
  getComponentCss,
  getNotificationContentStyles,
  getNotificationIconStyles,
  getNotificationRootStyles,
  getSlottedCss,
} from './inline-notification-styles';
import type { Theme } from '../../../types';
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
  it.each<[InlineNotificationState, Theme]>([
    ['neutral', 'light'],
    ['success', 'light'],
    ['error', 'light'],
    ['warning', 'light'],
    ['neutral', 'dark'],
    ['success', 'dark'],
    ['error', 'dark'],
    ['warning', 'dark'],
  ])('should return correct JssStyle for state: %s and theme: %s', (state, theme) => {
    expect(getNotificationRootStyles(state, theme)).toMatchSnapshot();
  });
});

describe('getNotificationIconStyles()', () => {
  it.each<InlineNotificationState>(['neutral', 'success', 'error', 'warning'])(
    'should return correct JssStyle for state: %s ',
    (state) => {
      expect(getNotificationIconStyles(state)).toMatchSnapshot();
    }
  );
});

describe('getNotificationContentStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getNotificationContentStyles()).toMatchSnapshot();
  });
});

describe('getCloseIconStyles()', () => {
  it('should return correct JssStyle', () => {
    expect(getCloseIconStyles()).toMatchSnapshot();
  });
});
