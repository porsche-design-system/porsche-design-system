import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['basic', true, true, 'left', true, 'dark'],
    ['basic', true, false, 'left', true, 'light'],
    ['basic', false, true, 'left', true, 'light'],
    ['basic', true, false, 'center', true, 'dark'],
    ['basic', true, true, 'center', true, 'light'],
    ['basic', false, false, 'center', true, 'light'],
    ['extended', true, true, 'center', true, 'light'],
    ['extended', false, false, 'center', true, 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, true, 'center', true, 'light'],
    ['extended', true, false, 'left', true, 'light'],
    ['extended', false, true, 'left', true, 'light'],
    ['extended', { base: false, xs: true, s: false, m: true, l: false, xl: true }, false, 'left', false, 'light'],
  ])(
    'should return correct css for width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s, hasNavigation: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
