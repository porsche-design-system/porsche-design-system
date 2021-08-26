import { getComponentCss } from './select-wrapper-filter-styles';
import type { FormState, Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<[boolean, FormState, Theme]>([
    [true, 'none', 'light'],
    [false, 'none', 'light'],
    [true, 'none', 'dark'],
    [false, 'none', 'dark'],
    [true, 'success', 'light'],
    [false, 'success', 'light'],
    [true, 'success', 'dark'],
    [false, 'success', 'dark'],
    [true, 'error', 'light'],
    [false, 'error', 'light'],
    [true, 'error', 'dark'],
    [false, 'error', 'dark'],
  ])('should return correct css for disabled: %o, state: %o and theme: %o', (disabled, state, theme) => {
    expect(getComponentCss(disabled, state, theme)).toMatchSnapshot();
  });
});
