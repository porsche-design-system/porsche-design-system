import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', false, 400, 'left', 'dark'],
    ['basic', false, 400, 'left', 'light'],
    ['basic', true, 400, 'left', 'light'],
    ['basic', false, 400, 'center', 'dark'],
    ['basic', false, 400, 'center', 'light'],
    ['basic', true, 400, 'center', 'light'],
    ['extended', false, 400, 'center', 'light'],
    ['extended', true, 400, 'center', 'light'],
    ['extended', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 400, 'center', 'light'],
    ['extended', false, 400, 'left', 'light'],
    ['extended', true, 400, 'left', 'light'],
    ['extended', { base: true, xs: false, s: true, m: false, l: true, xl: false }, 400, 'left', 'light'],
  ])(
    'should return correct css for width: %s, disablePagination: %j, splideSpeed: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
