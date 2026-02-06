import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './link-tile-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['4/3', 'medium', 'semi-bold', 'bottom', false, true, false],
    ['1/1', 'inherit', 'regular', 'bottom', false, true, false],
    ['3/4', 'medium', 'semi-bold', 'top', false, true, false],
    ['16/9', 'inherit', 'regular', 'top', true, false, true],
    ['9/16', 'medium', 'semi-bold', 'bottom', false, false, false],
    [
      { base: '1/1', xs: '4/3', s: '3/4', m: '16/9', l: '9/16', xl: '1/1' },
      { base: 'inherit', xs: 'medium', s: 'inherit', m: 'medium', l: 'inherit', xl: 'medium' },
      { base: 'semi-bold', xs: 'regular', s: 'semi-bold', m: 'regular', l: 'semi-bold', xl: 'regular' },
      'top',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      true,
      true,
    ],
  ])(
    'should return correct css for aspectRatio: %j, size: %j, weight: %j, align: %s, compact: %j, hasGradient: %s and hasFooterSlot: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
