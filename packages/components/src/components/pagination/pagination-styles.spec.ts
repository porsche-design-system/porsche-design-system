import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './pagination-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [1, 5, true],
    [1, 5, true],
    [1, 5, false],
    [1, 6, true],
    [2, 6, true],
    [3, 6, true],
    [4, 6, true],
    [5, 6, true],
    [6, 6, true],
    [1, 10, false],
    [1, 10, true],
    [2, 10, true],
    [3, 10, true],
    [4, 10, true],
    [5, 10, true],
    [6, 10, true],
    [7, 10, true],
    [8, 10, true],
    [9, 10, true],
    [10, 10, true],
  ])('should return correct css for activePage: %s, pageTotal: %s and showLastPage: %s', (...args) => {
    validateCssAndMatchSnapshot(getComponentCss(...args));
  });
});
