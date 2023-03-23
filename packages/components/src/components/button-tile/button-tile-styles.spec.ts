import { getComponentCss } from './button-tile-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, '4:3', 'default', 'semi-bold', 'bottom', false, true],
    [true, true, '1:1', 'inherit', 'regular', 'bottom', false, true],
    [false, true, '3:4', 'default', 'semi-bold', 'top', false, true],
    [true, false, '16:9', 'inherit', 'regular', 'top', true, false],
    [false, false, '9:16', 'default', 'semi-bold', 'bottom', false, false],

    [
      false,
      false,
      { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
      { base: 'inherit', xs: 'default', s: 'inherit', m: 'default', l: 'inherit', xl: 'default' },
      { base: 'semi-bold', xs: 'regular', s: 'semi-bold', m: 'regular', l: 'semi-bold', xl: 'regular' },
      'top',
      { base: true, xs: false, s: true, m: false, l: true, xl: false },
      true,
    ],
  ])(
    'should return correct css for isDisabled: %s, isDisabledOrLoading: %s, aspectRatio: %j, size: %j, weight: %j, align: %s, isCompact: %j and hasGradient: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
