import { getComponentCss } from './pagination-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [1, 10, 'light'],
    [1, 10, 'dark'],
    [2, 10, 'light'],
    [3, 10, 'light'],
    [4, 10, 'light'],
    [5, 10, 'light'],
  ])('should return correct css for activePage: %s, pageTotal: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
