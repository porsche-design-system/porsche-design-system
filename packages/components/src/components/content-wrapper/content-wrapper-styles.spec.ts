import { getComponentCss } from './content-wrapper-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', 'transparent', 'light'],
    ['extended', 'transparent', 'light'],
    ['fluid', 'transparent', 'light'],
    ['fluid', 'transparent', 'dark'],
    ['basic', 'default', 'light'],
    ['basic', 'default', 'dark'],
  ])('should return correct css for width: %s, background-color: %s, theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
