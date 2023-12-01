import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, 'xl', 'basic', true, true, 'start', 'dark'],
    [true, true, 'xxl', 'basic', true, false, 'start', 'light'],
    [true, false, 'xl', 'basic', false, true, 'start', 'light'],
    [false, true, 'xxl', 'basic', false, true, 'left', 'light'],
    [false, false, 'xl', 'basic', true, false, 'center', 'dark'],
    [false, false, 'xxl', 'basic', true, true, 'center', 'light'],
    [true, true, 'xl', 'basic', false, false, 'center', 'light'],
    [true, true, 'xxl', 'extended', true, true, 'center', 'light'],
    [true, false, 'xl', 'extended', false, false, 'center', 'light'],
    [
      false,
      true,
      'xxl',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      true,
      'center',
      'light',
    ],
    [false, false, 'xl', 'extended', true, false, 'start', 'light'],
    [false, false, 'xxl', 'extended', false, true, 'start', 'light'],
    [
      true,
      true,
      'xl',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      false,
      'start',
      'light',
    ],
  ])(
    'should return correct css for hasHeading: %s, hasDescription: %s, headingSize: %s, width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
