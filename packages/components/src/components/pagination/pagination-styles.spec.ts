import { getComponentCss } from './pagination-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [5, 'light'],
    [7, 'light'],
    [5, 'dark'],
    [7, 'dark'],
    [{ base: 5, xs: 7, s: 5, m: 7, l: 5, xl: 7 }, 'dark'],
  ])('should return correct css for maxNumberOfPageLinks: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
