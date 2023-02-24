import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', false, 'left', 'dark'],
    ['basic', false, 'left', 'light'],
    ['basic', true, 'left', 'light'],
    ['basic', false, 'center', 'dark'],
    ['basic', false, 'center', 'light'],
    ['basic', true, 'center', 'light'],
    ['extended', false, 'center', 'light'],
    ['extended', true, 'center', 'light'],
    ['extended', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'center', 'light'],
    ['extended', false, 'left', 'light'],
    ['extended', true, 'left', 'light'],
    ['extended', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'left', 'light'],
  ])('should return correct css for width: %s, disablePagination: %j, alignHeader: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
