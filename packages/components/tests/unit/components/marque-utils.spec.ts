import type { InnerManifest, MarqueSize } from '../../../src/components/basic/marque/marque-utils';
import {
  buildSrcSet,
  getDynamicCss,
  getManifestPath,
  getResponsiveMarque,
} from '../../../src/components/basic/marque/marque-utils';
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
      'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.da075315857e239ff46bf4c150648ff0@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.aa801f42028b1c385a5e26ae115da598@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.824818d15eaf445f50e0a2391613f214@3x.png 3x',
    ],
    [
      getManifestPath(true),
      'small',
      'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.020244b41a29323e2a7932a264514cdf@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.92184fae44511ceda8320443c17110b1@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.fd545cea4298f5d797246d5805711646@3x.png 3x',
    ],
    [
      getManifestPath(false),
      'medium',
      'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.a98627440b05154565f9f9dfc1ad6187@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.089d6dd560fff7a2bf613ae6d528990e@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.2cb874345ef290831c929f6caabfeef8@3x.png 3x',
    ],
    [
      getManifestPath(false),
      'small',
      'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.ac2042736af5512cf547c89fa7924c4f@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.22f1e9dc90399d9a5287eda689b60dba@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.49209245f04eadef8817b9bbae80d3e1@3x.png 3x',
    ],
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

describe('getDynamicCss()', () => {
  it.each([['responsive'], ['medium'], ['small']])('should match snapshot for getDynamicCss %s', (size: MarqueSize) => {
    expect(getDynamicCss(size)).toMatchSnapshot();
  });
});
