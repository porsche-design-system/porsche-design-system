import { getComponentCss } from './link-tile-product-styles';
import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, true, '3:4', 'light'],
    [true, false, '3:4', 'dark'],
    [true, false, '3:4', 'auto'],
    [false, false, '9:16', 'dark'],
    [true, false, { base: '3:4', xs: '9:16' }, 'light'],
  ])(
    'should return correct css for hasLikeButton: %s, hasSlottedAnchor: %s, aspectRatio: %j and theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
