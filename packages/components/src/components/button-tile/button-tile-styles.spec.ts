import { getComponentCss } from './button-tile-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [
      {
        aspectRatio: '4:3',
        size: 'default',
        weight: 'semi-bold',
        align: 'bottom',
        compact: false,
        hasGradient: true,
        isDisabled: false,
        disabledOrLoading: false,
      },
    ],
    [
      {
        aspectRatio: '1:1',
        size: 'inherit',
        weight: 'regular',
        align: 'bottom',
        compact: false,
        hasGradient: true,
        isDisabled: true,
        disabledOrLoading: true,
      },
    ],
    [
      {
        aspectRatio: '3:4',
        size: 'default',
        weight: 'semi-bold',
        align: 'top',
        compact: false,
        hasGradient: true,
        isDisabled: false,
        disabledOrLoading: true,
      },
    ],
    [
      {
        aspectRatio: '16:9',
        size: 'inherit',
        weight: 'regular',
        align: 'top',
        compact: true,
        hasGradient: false,
        isDisabled: true,
        disabledOrLoading: false,
      },
    ],
    [
      {
        aspectRatio: '9:16',
        size: 'default',
        weight: 'semi-bold',
        align: 'bottom',
        compact: false,
        hasGradient: false,
        isDisabled: false,
        disabledOrLoading: false,
      },
    ],
    [
      {
        aspectRatio: { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
        size: { base: 'inherit', xs: 'default', s: 'inherit', m: 'default', l: 'inherit', xl: 'default' },
        weight: { base: 'semi-bold', xs: 'regular', s: 'semi-bold', m: 'regular', l: 'semi-bold', xl: 'regular' },
        align: 'top',
        compact: { base: true, xs: false, s: true, m: false, l: true, xl: false },
        hasGradient: true,
        isDisabled: false,
        disabledOrLoading: false,
      },
    ],
  ])(
    'should return correct css for aspectRatio: %s, size: %s, weight: %s, align: %s, isCompact: %s and hasGradient: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
