import { getComponentCss } from './pagination-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [1, 5, 'dark'],
    [1, 5, 'light'],
    [1, 6, 'light'],
    [2, 6, 'light'],
    [3, 6, 'light'],
    [4, 6, 'light'],
    [5, 6, 'light'],
    [6, 6, 'light'],
    [1, 10, 'light'],
    [2, 10, 'light'],
    [3, 10, 'light'],
    [4, 10, 'light'],
    [5, 10, 'light'],
    [6, 10, 'light'],
    [7, 10, 'light'],
    [8, 10, 'light'],
    [9, 10, 'light'],
    [10, 10, 'light'],
  ])('should return correct css for activePage: %s, pageTotal: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
