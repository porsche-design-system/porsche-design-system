import type { InnerManifest, MarqueSize } from './marque-utils';
import { buildSrcSet, getInnerManifest, MarqueFormat } from './marque-utils';
import { MARQUES_MANIFEST } from '@porsche-design-system/marque';

describe('getManifestPath()', () => {
  it('should return correct object with trademark', () => {
    expect(getInnerManifest(true)).toBe(MARQUES_MANIFEST.porscheMarqueTrademark);
  });

  it('should return correct object without trademark', () => {
    expect(getInnerManifest(false)).toBe(MARQUES_MANIFEST.porscheMarque);
  });
});

describe('buildSrcSet()', () => {
  const innerManifest = getInnerManifest();
  const innerManifestTrademark = getInnerManifest(true);

  describe('for png', () => {
    it.each<[InnerManifest, MarqueSize, MarqueFormat]>([
      [innerManifestTrademark, 'medium', 'png'],
      [innerManifestTrademark, 'small', 'png'],
      [innerManifest, 'medium', 'png'],
      [innerManifest, 'small', 'png'],
    ])('should return correct srcSet for innerManifest: %p, size: %s and format: %s', (innerManifest, size, format) => {
      expect(buildSrcSet(innerManifest, size, format)).toMatchSnapshot();
    });
  });

  describe('for webp', () => {
    it.each<[InnerManifest, MarqueSize, MarqueFormat]>([
      [innerManifestTrademark, 'medium', 'webp'],
      [innerManifestTrademark, 'small', 'webp'],
      [innerManifest, 'medium', 'webp'],
      [innerManifest, 'small', 'webp'],
    ])('should return correct srcSet for innerManifest: %p, size: %s and format: %s', (innerManifest, size, format) => {
      expect(buildSrcSet(innerManifest, size, format)).toMatchSnapshot();
    });
  });
});
