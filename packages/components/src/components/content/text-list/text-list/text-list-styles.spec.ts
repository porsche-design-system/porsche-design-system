import { getComponentCss, getSlottedCss } from './text-list-styles';
import type { Theme } from '../../../../types';

describe('getComponentCss()', () => {
  it.each<Theme>(['light', 'dark'])('should return correct css for theme: %s', (theme) => {
    expect(getComponentCss(theme)).toMatchSnapshot();
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-text-list');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-text-list');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});
