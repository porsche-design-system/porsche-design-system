import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', true, true, 'left', 'dark'],
    ['basic', true, false, 'left', 'light'],
    ['basic', false, true, 'left', 'light'],
    ['basic', true, false, 'center', 'dark'],
    ['basic', true, true, 'center', 'light'],
    ['basic', false, false, 'center', 'light'],
    ['extended', true, true, 'center', 'light'],
    ['extended', false, false, 'center', 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, true, 'center', 'light'],
    ['extended', true, false, 'left', 'light'],
    ['extended', false, true, 'left', 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, false, 'left', 'light'],
  ])(
    'should return correct css for width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
