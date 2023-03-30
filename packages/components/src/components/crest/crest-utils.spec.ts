import { buildCrestSrcSet, crestInnerManifest } from './crest-utils';
import { CRESTS_MANIFEST } from '@porsche-design-system/crest';

describe('crestInnerManifest', () => {
  it('should return correct object', () => {
    expect(crestInnerManifest).toBe(CRESTS_MANIFEST.porscheCrest);
  });
});

describe('buildCrestSrcSet()', () => {
  it.each<Parameters<typeof buildCrestSrcSet>>([['png'], ['webp']])(
    'should return correct srcSet for format: %s',
    (...args) => {
      expect(buildCrestSrcSet(...args)).toMatchSnapshot();
    }
  );
});
