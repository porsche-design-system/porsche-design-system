import { getComponentCss } from './text-list-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['unordered', 'numbered', 'light'],
    ['ordered', 'numbered', 'light'],
    ['ordered', 'alphabetically', 'light'],
    ['unordered', 'numbered', 'dark'],
    ['ordered', 'numbered', 'dark'],
    ['ordered', 'alphabetically', 'dark'],
  ])('should return correct css for listType: %s, orderType: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
