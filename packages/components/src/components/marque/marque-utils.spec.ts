import type { MarqueSize } from './marque-size';
import type { InnerManifest, MarqueFormat } from './marque-utils';
import { buildImgSrc, buildSrcSet, getInnerManifest } from './marque-utils';
import { MARQUES_MANIFEST } from '@porsche-design-system/assets';

describe('getManifestPath()', () => {
  it('should return correct object with trademark', () => {
    expect(getInnerManifest('default', true)).toStrictEqual(MARQUES_MANIFEST.porscheMarqueTrademark);
  });

  it('should return correct object without trademark', () => {
    expect(getInnerManifest('default', false)).toStrictEqual(MARQUES_MANIFEST.porscheMarque);
  });

  it('should return correct object with 75 years variant', () => {
    expect(getInnerManifest('75-years', false)).toStrictEqual(MARQUES_MANIFEST.porscheMarque75);
  });
});

describe('buildSrcSet()', () => {
  const innerManifest = getInnerManifest();
  const innerManifestTrademark = getInnerManifest('default', true);
  const innerManifest75 = getInnerManifest('75-years', true);

  describe('for png', () => {
    it.each<[InnerManifest, MarqueSize, MarqueFormat]>([
      [innerManifestTrademark, 'medium', 'png'],
      [innerManifestTrademark, 'small', 'png'],
      [innerManifest, 'medium', 'png'],
      [innerManifest, 'small', 'png'],
      [innerManifest75, 'medium', 'png'],
      [innerManifest75, 'small', 'png'],
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
      [innerManifest75, 'medium', 'webp'],
      [innerManifest75, 'small', 'webp'],
    ])('should return correct srcSet for innerManifest: %p, size: %s and format: %s', (innerManifest, size, format) => {
      expect(buildSrcSet(innerManifest, size, format)).toMatchSnapshot();
    });
  });
});

describe('buildImgSrc()', () => {
  it('should return correct url', () => {
    const innerManifest = getInnerManifest();
    expect(buildImgSrc(innerManifest)).toMatchSnapshot();
  });
});
