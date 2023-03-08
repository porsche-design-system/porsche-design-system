import { getComponentCss } from './link-tile-model-signature-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['4:3', 'semibold', 'row', true],
    ['1:1', 'regular', 'column', false],
    ['3:4', 'semibold', 'row', true],
    ['16:9', 'regular', 'column', true],
    ['9:16', 'semibold', 'row', false],
    [
      { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
      { base: 'semibold', xs: 'regular', s: 'semibold', m: 'regular', l: 'semibold', xl: 'regular' },
      { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
      true,
    ],
  ])(
    'should return correct css for aspectRatio: %s, size: %s, weight: %s, align: %s, isCompact: %s and hasGradient: %s',
    (...args) => {
      expect(getComponentCss(...args)).toMatchSnapshot();
    }
  );
});
