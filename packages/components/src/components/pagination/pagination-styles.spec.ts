import { getComponentCss } from './pagination-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [1, 5, true, 'dark'],
    [1, 5, true, 'light'],
    [1, 5, false, 'light'],
    [1, 6, true, 'light'],
    [2, 6, true, 'light'],
    [3, 6, true, 'light'],
    [4, 6, true, 'light'],
    [5, 6, true, 'light'],
    [6, 6, true, 'light'],
    [1, 10, false, 'light'],
    [1, 10, true, 'light'],
    [2, 10, true, 'light'],
    [3, 10, true, 'light'],
    [4, 10, true, 'light'],
    [5, 10, true, 'light'],
    [6, 10, true, 'light'],
    [7, 10, true, 'light'],
    [8, 10, true, 'light'],
    [9, 10, true, 'light'],
    [10, 10, true, 'light'],
  ])('should return correct css for activePage: %s, pageTotal: %s, showLastPage: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
