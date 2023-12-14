import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, true, 'x-large', 'basic', true, true, 'start', 'dark'],
    [true, true, true, 'xx-large', 'basic', true, false, 'start', 'light'],
    [true, true, false, 'xx-large', 'basic', true, false, 'start', 'light'],
    [true, false, true, 'x-large', 'basic', false, true, 'start', 'light'],
    [false, true, true, 'xx-large', 'basic', false, true, 'left', 'light'],
    [false, false, true, 'x-large', 'basic', true, false, 'center', 'dark'],
    [false, false, true, 'xx-large', 'basic', true, true, 'center', 'light'],
    [true, true, true, 'x-large', 'basic', false, false, 'center', 'light'],
    [true, true, true, 'xx-large', 'extended', true, true, 'center', 'light'],
    [true, false, true, 'x-large', 'extended', false, false, 'center', 'light'],
    [
      false,
      true,
      true,
      'xx-large',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      true,
      'center',
      'light',
    ],
    [false, false, true, 'x-large', 'extended', true, false, 'start', 'light'],
    [false, false, true, 'xx-large', 'extended', false, true, 'start', 'light'],
    [
      true,
      true,
      true,
      'x-large',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      false,
      'start',
      'light',
    ],
  ])(
    'should return correct css for hasHeading: %s, hasDescription: %s, hasHeader: %s, headingSize: %s, width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s and theme: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
