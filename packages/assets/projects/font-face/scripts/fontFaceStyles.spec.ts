import { cdnUrlMap, getMinifiedPorscheNextFontFaceCss, unicodeRangeMap } from './fontFaceStyles';

it('should contain correct values for unicodeRangeMap', () => {
  expect(unicodeRangeMap).toMatchSnapshot();
});

it('should contain correct values for cdnUrlMap', () => {
  expect(cdnUrlMap).toMatchSnapshot();
});

describe('getMinifiedPorscheNextFontFaceCss()', () => {
  it.each<Parameters<typeof getMinifiedPorscheNextFontFaceCss>>([
    [{ cdn: 'com' }],
    [{ cdn: 'cn' }],
    [{ cdn: 'localhost' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getMinifiedPorscheNextFontFaceCss(...args)).toMatchSnapshot();
  });
});
