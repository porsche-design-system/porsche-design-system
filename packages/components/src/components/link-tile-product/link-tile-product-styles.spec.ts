import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './link-tile-product-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, false, false, '3/4'],
    [true, true, true, false, '3/4'],
    [true, true, true, true, '3/4'],
    [true, false, false, false, '3/4'],
    [true, false, false, false, '3/4'],
    [false, false, false, false, '9/16'],
    [true, false, false, false, { base: '3/4', xs: '9/16' }],
  ])(
    'should return correct css for hasLikeButton: %s, hasSlottedAnchor: %s, hasPriceOriginal: %s, hasDescription: %s, aspectRatio: %j',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
