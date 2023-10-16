import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', true, true, 'start', 'dark'],
    ['basic', true, false, 'start', 'light'],
    ['basic', false, true, 'start', 'light'],
    ['basic', true, false, 'center', 'dark'],
    ['basic', true, true, 'center', 'light'],
    ['basic', false, false, 'center', 'light'],
    ['extended', true, true, 'center', 'light'],
    ['extended', false, false, 'center', 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, true, 'center', 'light'],
    ['extended', true, false, 'start', 'light'],
    ['extended', false, true, 'start', 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, false, 'start', 'light'],
  ])(
    'should return correct css for width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
