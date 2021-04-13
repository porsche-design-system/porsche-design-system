import type { InnerManifest, MarqueSize } from '../../../src/components/basic/marque/marque-utils';
import { buildSrcSet, getManifestPath, getResponsiveMarque } from '../../../src/components/basic/marque/marque-utils';
import { MARQUES_MANIFEST } from '@porsche-design-system/marque';

describe('getManifestPath()', () => {
  it('should return correct object with trademark', () => {
    expect(getManifestPath(true)).toBe(MARQUES_MANIFEST.porscheMarqueTrademark);
  });

  it('should return correct object without trademark', () => {
    expect(getManifestPath(false)).toBe(MARQUES_MANIFEST.porscheMarque);
  });
});

describe('buildSrcSet()', () => {
  it.each([
    [
      getManifestPath(true),
      'medium',
      'asd/porsche-marque.small.min.ac2042736af5512cf547c89fa7924c4f@1x.png 1x,asd/porsche-marque.small.min.22f1e9dc90399d9a5287eda689b60dba@2x.png 2x,asd/porsche-marque.small.min.49209245f04eadef8817b9bbae80d3e1@3x.png 3x',
    ],
    [getManifestPath(true), 'small', 'somestring'],
    [getManifestPath(false), 'medium', 'somestring'],
    [getManifestPath(false), 'small', 'somestring'],
  ])(
    'should return correct buildSrcSet for manifestPath %s and size %s',
    (manifestPath: InnerManifest, size: MarqueSize, result: string) => {
      expect(buildSrcSet(manifestPath, size)).toBe(result);
    }
  );
});

describe('getResponsiveMarque()', () => {
  it.each([
    [true, 'responsive'],
    [true, 'medium'],
    [true, 'small'],
    [false, 'responsive'],
    [false, 'medium'],
    [false, 'small'],
  ])('should match snapshot for trademark %s and size %s', (trademark: boolean, size: MarqueSize) => {
    expect(getResponsiveMarque(trademark, size)).toMatchSnapshot();
  });
});
