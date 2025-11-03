import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [20, 2, false, 'none', 'auto'],
    [80, 1, true, 'none', 'light'],
    [230, 10, false, 'error', 'light'],
    [20, { base: 4, s: 3, m: 2, l: 'auto' }, false, 'none', 'light'],
  ])('should return correct css for maxWidth: %s, columns: %s, state: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
