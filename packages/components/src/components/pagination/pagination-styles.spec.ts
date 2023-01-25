import { getComponentCss } from './pagination-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [5, 'light', 'Previous page', 'Next page'],
    [7, 'light', 'Previous page', 'Next page'],
    [5, 'dark', 'Previous page', 'Next page'],
    [7, 'dark', 'Previous page', 'Next page'],
    [{ base: 5, xs: 7, s: 5, m: 7, l: 5, xl: 7 }, 'dark', 'Previous page', 'Next page'],
  ])('should return correct css for maxNumberOfPageLinks: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
