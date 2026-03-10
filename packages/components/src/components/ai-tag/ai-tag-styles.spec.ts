import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import type { Theme } from '../../types';
import { getComponentCss } from './ai-tag-styles';
import { AI_TAG_ICONS, type AiTagIcon } from './ai-tag-utils';

describe('getComponentCss()', () => {
  it.each<[AiTagIcon, Theme]>([
    ['ai-spark', 'light'],
    ['ai-spark', 'dark'],
    ['ai-spark-filled', 'light'],
    ['ai-spark-filled', 'dark'],
    ['ai-code', 'light'],
    ['ai-image', 'dark'],
  ])('should return correct css for icon: %s, theme: %s', (icon, theme) => {
    validateCssAndMatchSnapshot(getComponentCss(icon, theme));
  });

  it('should return correct css for all icons with light theme', () => {
    for (const icon of AI_TAG_ICONS) {
      expect(() => getComponentCss(icon, 'light')).not.toThrow();
    }
  });
});
