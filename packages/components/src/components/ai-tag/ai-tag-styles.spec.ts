import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { Theme } from '../../types';
import { getComponentCss } from './ai-tag-styles';

describe('getComponentCss()', () => {
  it.each<Theme>(['light', 'dark'])('should return correct css for theme: %s', (theme) => {
    validateCssAndMatchSnapshot(getComponentCss(theme));
  });
});
