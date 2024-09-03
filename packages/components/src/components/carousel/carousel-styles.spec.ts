import { getComponentCss } from './carousel-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['background-base', true, true, true, 'x-large', 'basic', true, true, 'start', 'dark', true],
    ['background-base', true, true, true, 'xx-large', 'basic', true, false, 'start', 'light', false],
    ['background-base', true, true, false, 'xx-large', 'basic', true, false, 'start', 'light', true],
    ['background-base', true, false, true, 'x-large', 'basic', false, true, 'start', 'light', true],
    ['background-surface', false, true, true, 'xx-large', 'basic', false, true, 'left', 'light', true],
    ['background-surface', false, false, true, 'x-large', 'basic', true, false, 'center', 'dark', true],
    ['background-surface', false, false, true, 'xx-large', 'basic', true, true, 'center', 'light', true],
    ['none', true, true, true, 'x-large', 'basic', false, false, 'center', 'light', true],
    ['none', true, true, true, 'xx-large', 'extended', true, true, 'center', 'light', true],
    ['none', true, false, true, 'x-large', 'extended', false, false, 'center', 'light', true],
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
    ],
    ['background-base', false, false, true, 'x-large', 'extended', true, false, 'start', 'light', true],
    ['background-base', false, false, true, 'xx-large', 'extended', false, true, 'start', 'light', true],
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
    ],
  ])(
    'should return correct css for hasHeading: %s, hasDescription: %s, hasControlsSlot: %s, headingSize: %s, width: %s, hasPagination: %j, isInfinitePagination: %s, alignHeader: %s, theme: %s and hasNavigation: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
