import { getPorscheNextFontFaceStyles } from './font-face-styles';

describe('getContentWrapperJssStyle()', () => {
  it.each<Parameters<typeof getPorscheNextFontFaceStyles>>([
    [{ baseUrl: 'https://some-url' }],
    [{ baseUrl: 'https://some-other-url' }],
  ])('should return correct css for opts: %s', (...args) => {
    expect(getPorscheNextFontFaceStyles(...args)).toMatchSnapshot();
  });
});
