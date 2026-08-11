import { anchorSlot, headerSlot, TILE_PRODUCT_ASPECT_RATIOS } from './link-tile-product-utils';

describe('TILE_PRODUCT_ASPECT_RATIOS', () => {
  it('should list supported aspect ratios', () => {
    expect(TILE_PRODUCT_ASPECT_RATIOS).toStrictEqual(['3/4', '9/16']);
  });
});

describe('headerSlot', () => {
  it('should be the header slot name', () => {
    expect(headerSlot).toBe('header');
  });
});

describe('anchorSlot', () => {
  it('should be the anchor slot name', () => {
    expect(anchorSlot).toBe('anchor');
  });
});
