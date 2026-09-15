import { cdnUrlMap, getMinifiedPorscheNextFontFaceCss, unicodeRangeMap } from './fontFaceStyles';

it('should contain correct values for unicodeRangeMap', () => {
  expect(unicodeRangeMap).toMatchSnapshot();
});

it('should contain correct values for cdnUrlMap', () => {
  expect(cdnUrlMap).toMatchSnapshot();
});

describe('getMinifiedPorscheNextFontFaceCss()', () => {
  it.each<[string | undefined, string]>([
    [undefined, './../fonts/'],
    ['./assets/porsche-design-system', './assets/porsche-design-system/fonts/'],
  ])('should use the font path for %s', (path, expected) => {
    const css = getMinifiedPorscheNextFontFaceCss(path);
    const urls = Array.from(css.matchAll(/url\(([^)]+)\)/g), ([, url]) => url.replace(/['"]/g, ''));

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url.startsWith(expected)).toBe(true);
      expect(url).toMatch(/\.woff2$/);
    }
  });

  it.each<Parameters<typeof getMinifiedPorscheNextFontFaceCss>>([
    [{ cdn: 'com' }],
    [{ cdn: 'cn' }],
    [{ cdn: 'localhost' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getMinifiedPorscheNextFontFaceCss(...args)).toMatchSnapshot();
  });
});
