import { getComponentCss } from './link-tile-model-signature-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    ['4:3', 'semi-bold', 'row', true],
    ['1:1', 'regular', 'column', false],
    ['3:4', 'semi-bold', 'row', true],
    ['16:9', 'regular', 'column', true],
    ['9:16', 'semi-bold', 'row', false],
    [
      { base: '1:1', xs: '4:3', s: '3:4', m: '16:9', l: '9:16', xl: '1:1' },
      { base: 'semi-bold', xs: 'regular', s: 'semi-bold', m: 'regular', l: 'semi-bold', xl: 'regular' },
      { base: 'column', xs: 'row', s: 'column', m: 'row', l: 'column', xl: 'row' },
      true,
    ],
  ])(
    'should return correct css for aspectRatio: %j, weight: %j, linkDirection: %j and hasDescription: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
