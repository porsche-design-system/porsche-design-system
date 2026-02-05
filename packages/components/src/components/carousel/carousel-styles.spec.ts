import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, true, false, 'x-large', 'basic', true, true, 'start', true, 'auto'],
    [true, true, true, false, 'xx-large', 'basic', true, false, 'start', false, 'auto'],
    [true, true, false, false, 'xx-large', 'basic', true, false, 'start', true, 'center'],
    [true, false, true, false, 'x-large', 'basic', false, true, 'start', true, 'auto'],
    [false, true, true, false, 'xx-large', 'basic', false, true, 'start', true, 'auto'],
    [false, false, true, false, 'x-large', 'basic', true, false, 'center', true, 'start'],
    [false, false, true, false, 'xx-large', 'basic', true, true, 'center', true, 'center'],
    [true, true, true, false, 'x-large', 'basic', false, false, 'center', true, 'auto'],
    [true, true, true, false, 'xx-large', 'extended', true, true, 'center', true, 'auto'],
    [true, false, true, false, 'x-large', 'extended', false, false, 'center', true, 'auto'],
    [
      false,
      true,
      true,
      false,
      'xx-large',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      true,
      'center',
      true,
      'auto',
    ],
    [false, false, true, false, 'x-large', 'extended', true, false, 'start', true, 'auto'],
    [false, false, true, false, 'xx-large', 'extended', false, true, 'start', true, 'auto'],
    [
      true,
      true,
      true,
      false,
      'x-large',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      false,
      'start',
      true,
      'auto',
    ],
  ])(
    'should return correct css for gradientColor: %s, hasHeading: %s, hasDescription: %s, hasControlsSlot: %s, headingSize: %s, width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s, theme: %s, hasNavigation: %s and alignControls: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
