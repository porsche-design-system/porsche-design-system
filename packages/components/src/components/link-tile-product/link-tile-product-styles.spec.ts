import { getComponentCss } from './link-tile-product-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, false, false, '3:4', 'light'],
    [true, true, true, false, '3:4', 'light'],
    [true, true, true, true, '3:4', 'light'],
    [true, false, false, false, '3:4', 'dark'],
    [true, false, false, false, '3:4', 'auto'],
    [false, false, false, false, '9:16', 'dark'],
    [true, false, false, false, { base: '3:4', xs: '9:16' }, 'light'],
  ])(
    'should return correct css for hasLikeButton: %s, hasSlottedAnchor: %s, hasPriceOriginal: %s, hasDescription: %s, aspectRatio: %j and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
