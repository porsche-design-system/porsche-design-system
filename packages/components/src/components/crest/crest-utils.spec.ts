import { describe, expect, it } from 'vitest';
import { buildCrestImgSrc, buildCrestSrcSet } from './crest-utils';

describe('buildCrestSrcSet()', () => {
  it.each<Parameters<typeof buildCrestSrcSet>>([['png'], ['webp']])(
    'should return correct srcSet for format: %s',
    (...args) => {
      expect(buildCrestSrcSet(...args)).toMatchSnapshot();
    }
  );
});

describe('buildCrestImgSrc()', () => {
  it('should return correct url', () => {
    expect(buildCrestImgSrc()).toMatchSnapshot();
  });
});
