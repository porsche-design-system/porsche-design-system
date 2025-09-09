import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './link-tile-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['4:3', 'default', 'semi-bold', 'dark', 'bottom', false, true, false],
    ['1:1', 'inherit', 'regular', 'light', 'bottom', false, true, true],
    ['3:4', 'default', 'semi-bold', 'dark', 'top', false, true, false],
    ['16:9', 'inherit', 'regular', 'light', 'top', true, false, true],
    ['9:16', 'default', 'semi-bold', 'dark', 'bottom', false, false, true],
    [
      { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
      { base: 'inherit', xs: 'default', s: 'inherit', m: 'default', l: 'inherit', xl: 'default' },
      { base: 'semi-bold', xs: 'regular', s: 'semi-bold', m: 'regular', l: 'semi-bold', xl: 'regular' },
      'light',
      'top',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      true,
      false,
    ],
  ])(
    'should return correct css for aspectRatio: %j, size: %j, weight: %j, background: %s, align: %s, isCompact: %j, hasGradient: %s and hasFooterText: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
