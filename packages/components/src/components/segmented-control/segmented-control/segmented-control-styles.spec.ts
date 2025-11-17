import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss, MIN_ITEM_WIDTH } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [MIN_ITEM_WIDTH, 20, 'auto', false],
    [MIN_ITEM_WIDTH, 80, 1, false],
    [36, 230, 10, true],
    [MIN_ITEM_WIDTH, 20, { base: 4, s: 3, m: 2, l: 'auto' }, true],
  ])('should return correct css for minWidth: %s, maxWidth: %s, columns: %s and compact: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
