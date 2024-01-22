import { getComponentCss } from './segmented-control-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [20, 'auto'],
    [80, 1],
    [230, 10],
    [20, { base: 4, s: 3, m: 2, l: 'auto' }],
  ])('should return correct css for maxWidth: %s and columns: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
