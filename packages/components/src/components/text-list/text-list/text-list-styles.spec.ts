import { getComponentCss } from './text-list-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['unordered', 'light'],
    ['numbered', 'light'],
    ['alphabetically', 'light'],
    ['unordered', 'dark'],
    ['numbered', 'dark'],
    ['alphabetically', 'dark'],
  ])('should return correct css for type: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
