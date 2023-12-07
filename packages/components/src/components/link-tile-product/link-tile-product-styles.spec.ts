import { getComponentCss } from './link-tile-product-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [true, '3:4', 'light'],
    [true, '3:4', 'dark'],
    [true, '3:4', 'auto'],
    [false, '9:16', 'dark'],
    [true, { base: '3:4', xs: '9:16' }, 'light'],
  ])('should return correct css for likeButton: %s, aspectRatio: %j and theme: %s', (...args) => {
    expect(getComponentCss(...args)).toMatchSnapshot();
  });
});
