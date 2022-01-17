import { getComponentCss } from './icon-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['default', 'small', 'light'],
    ['default', 'small', 'dark'],
    ['brand', 'small', 'light'],
    ['inherit', 'small', 'light'],
    ['default', 'large', 'light'],
    ['default', 'inherit', 'light'],
  ])('should return correct css for color: %s, size: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
