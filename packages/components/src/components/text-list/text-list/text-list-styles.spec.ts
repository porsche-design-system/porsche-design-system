import { getComponentCss } from './text-list-styles';
import type { Theme } from '../../../types';

describe('getComponentCss()', () => {
  it.each<Theme>(['light', 'dark'])('should return correct css for theme: %s', (theme) => {
    expect(getComponentCss(theme)).toMatchSnapshot();
  });
});
