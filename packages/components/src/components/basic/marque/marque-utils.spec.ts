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
    it.each<[InnerManifest, MarqueSize, MarqueFormat, string]>([
      [
        innerManifestTrademark,
        'medium',
        'png',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.da075315857e239ff46bf4c150648ff0@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.aa801f42028b1c385a5e26ae115da598@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.824818d15eaf445f50e0a2391613f214@3x.png 3x',
      ],
      [
        innerManifestTrademark,
        'small',
        'png',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.020244b41a29323e2a7932a264514cdf@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.92184fae44511ceda8320443c17110b1@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.fd545cea4298f5d797246d5805711646@3x.png 3x',
      ],
      [
        innerManifest,
        'medium',
        'png',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.a98627440b05154565f9f9dfc1ad6187@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.089d6dd560fff7a2bf613ae6d528990e@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.2cb874345ef290831c929f6caabfeef8@3x.png 3x',
      ],
      [
        innerManifest,
        'small',
        'png',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.ac2042736af5512cf547c89fa7924c4f@1x.png 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.22f1e9dc90399d9a5287eda689b60dba@2x.png 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.49209245f04eadef8817b9bbae80d3e1@3x.png 3x',
      ],
    ])(
      'should return correct srcSet for innerManifest: %p, size: %s and format: %s',
      (innerManifest, size, format, result) => {
        expect(buildSrcSet(innerManifest, size, format)).toBe(result);
      }
    );
  });

  describe('for webp', () => {
    it.each<[InnerManifest, MarqueSize, MarqueFormat, string]>([
      [
        innerManifestTrademark,
        'medium',
        'webp',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.b3f2ca77d95623fe018d8527ad7f7e5e@1x.webp 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.72144b89c336e6ba734db15ab192e025@2x.webp 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.medium.min.ac48e20a6fd43fa0b22d695e7db26b97@3x.webp 3x',
      ],
      [
        innerManifestTrademark,
        'small',
        'webp',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.bc9f525fcea295cc9d5cbe8e6350faf9@1x.webp 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.f98b4ef930a90e2235927800ae6647bb@2x.webp 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque-trademark.small.min.731a50d980bb6996b884d550c4500b02@3x.webp 3x',
      ],
      [
        innerManifest,
        'medium',
        'webp',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.ac06b2155a882c4f86b85a26e942c16d@1x.webp 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.1bd8e4828e952e6d18722bb6ae458f0d@2x.webp 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.medium.min.e735544bae7bf5dca42c05a2b6762c0a@3x.webp 3x',
      ],
      [
        innerManifest,
        'small',
        'webp',
        'https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.9ab63325b76ee4621cbfb6ce4a2bb264@1x.webp 1x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.d03bf68a12f8526eb999af62d61d40c2@2x.webp 2x,https://cdn.ui.porsche.com/porsche-design-system/marque/porsche-marque.small.min.b7d7a0825d39e9bbc921512d0ecf63fa@3x.webp 3x',
      ],
    ])(
      'should return correct srcSet for innerManifest: %p, size: %s and format: %s',
      (innerManifest, size, format, result) => {
        expect(buildSrcSet(innerManifest, size, format)).toBe(result);
      }
    );
  });
});
