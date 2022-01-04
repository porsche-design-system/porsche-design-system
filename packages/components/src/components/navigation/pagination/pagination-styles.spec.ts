import type { Theme } from '../../../types';
import type { BreakpointCustomizable } from '../../../types';
import { getComponentCss } from './pagination-styles';
import type { NumberOfPageLinks } from './pagination-utils';

describe('getComponentCss()', () => {
  it.each<[BreakpointCustomizable<NumberOfPageLinks>, Theme]>([
    [5, 'light'],
    [7, 'light'],
    [5, 'dark'],
    [7, 'dark'],
    [{ base: 5, xs: 7, s: 5, m: 7, l: 5, xl: 7 }, 'dark'],
  ])('should return correct css for maxNumberOfPageLinks: %s and theme: %s', (maxNumberOfPageLinks, theme) => {
    expect(getComponentCss(maxNumberOfPageLinks, theme)).toMatchSnapshot();
  });
});
