import { getComponentCss, getSlottedCss } from './inline-notification-styles';
import type { Theme } from '../../../types';
import type { InlineNotificationState } from './inline-notification-utils';

describe('getComponentCss()', () => {
  it.each<[InlineNotificationState, boolean, boolean, Theme]>([
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
  ])(
    'should return correct css for state: %s, hasAction: %s, hasClose: %s and theme: %s',
    (state, hasAction, hasClose, theme) => {
      expect(getComponentCss(state, hasAction, hasClose, theme)).toMatchSnapshot();
    }
  );
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
