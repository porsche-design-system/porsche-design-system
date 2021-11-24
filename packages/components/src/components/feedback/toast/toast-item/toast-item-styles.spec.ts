import { getComponentCss } from './toast-item-styles';
import type { ToastState } from '../toast/toast-utils';
import type { Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[ToastState, Theme]>([
    ['success', 'light'],
    ['neutral', 'light'],
    ['success', 'dark'],
    ['neutral', 'dark'],
  ])('should return correct css for state: %s and theme: %s', (state, theme) => {
    expect(getComponentCss(state, theme)).toMatchSnapshot();
  });
});
