import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';
import { getComponentCss } from './segmented-control-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [20, 2, 'none', 'auto'],
    [80, 1, 'none', 'light'],
    [230, 10, 'error', 'light'],
    [20, { base: 4, s: 3, m: 2, l: 'auto' }, 'none', 'light'],
  ])('should return correct css for maxWidth: %s, columns: %s, state: %s and theme: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
