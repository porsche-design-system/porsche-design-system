import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './carousel-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', true, true, true, 'x-large', 'basic', true, true, 'start', 'dark', true, 'auto'],
    ['background-base', true, true, true, 'xx-large', 'basic', true, false, 'start', 'light', false, 'auto'],
    ['background-base', true, true, false, 'xx-large', 'basic', true, false, 'start', 'light', true, 'center'],
    ['background-base', true, false, true, 'x-large', 'basic', false, true, 'start', 'light', true, 'auto'],
    ['background-surface', false, true, true, 'xx-large', 'basic', false, true, 'left', 'light', true, 'auto'],
    ['background-surface', false, false, true, 'x-large', 'basic', true, false, 'center', 'dark', true, 'start'],
    ['background-surface', false, false, true, 'xx-large', 'basic', true, true, 'center', 'light', true, 'center'],
    ['none', true, true, true, 'x-large', 'basic', false, false, 'center', 'light', true, 'auto'],
    ['none', true, true, true, 'xx-large', 'extended', true, true, 'center', 'light', true, 'auto'],
    ['none', true, false, true, 'x-large', 'extended', false, false, 'center', 'light', true, 'auto'],
    [
      'background-base',
      false,
      true,
      true,
      'xx-large',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      true,
      'center',
      'light',
      true,
      'auto',
    ],
    ['background-base', false, false, true, 'x-large', 'extended', true, false, 'start', 'light', true, 'auto'],
    ['background-base', false, false, true, 'xx-large', 'extended', false, true, 'start', 'light', true, 'auto'],
    [
      'background-surface',
      true,
      true,
      true,
      'x-large',
      'extended',
      { base: false, xs: true, s: false, m: true, l: false, xl: true },
      false,
      'start',
      'light',
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
