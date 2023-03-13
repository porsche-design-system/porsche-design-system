import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', true, 'left', 'dark'],
    ['basic', true, 'left', 'light'],
    ['basic', false, 'left', 'light'],
    ['basic', true, 'center', 'dark'],
    ['basic', true, 'center', 'light'],
    ['basic', false, 'center', 'light'],
    ['extended', true, 'center', 'light'],
    ['extended', false, 'center', 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, 'center', 'light'],
    ['extended', true, 'left', 'light'],
    ['extended', false, 'left', 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, 'left', 'light'],
  ])('should return correct css for width: %s, hasPagination: %j, alignHeader: %s and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
