import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, 'xl', true, 'basic', true, true, 'start', 'dark'],
    [true, true, 'xxl', false, 'basic', true, false, 'start', 'light'],
    [true, false, 'xl', false, 'basic', false, true, 'start', 'light'],
    [false, true, 'xxl', true, 'basic', false, true, 'left', 'light'],
    [false, false, 'xl', true, 'basic', true, false, 'center', 'dark'],
    [false, false, 'xxl', false, 'basic', true, true, 'center', 'light'],
    [true, true, 'xl', true, 'basic', false, false, 'center', 'light'],
    [true, true, 'xxl', false, 'extended', true, true, 'center', 'light'],
    [true, false, 'xl', false, 'extended', false, false, 'center', 'light'],
    [
      false,
      true,
      'xxl',
      true,
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      true,
      'center',
      'light',
    ],
    [false, false, 'xl', true, 'extended', true, false, 'start', 'light'],
    [false, false, 'xxl', false, 'extended', false, true, 'start', 'light'],
    [
      true,
      true,
      'xl',
      true,
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      false,
      'start',
      'light',
    ],
  ])(
    'should return correct css for hasHeading: %s, hasDescription: %s, headingSize: %s, hasHeader: %s, width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
