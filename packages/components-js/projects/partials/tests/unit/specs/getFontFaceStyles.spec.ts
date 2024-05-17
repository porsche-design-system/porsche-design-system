import { getFontFaceStyles } from '../../../src';
import { renderToString } from 'react-dom/server';
import { format } from 'prettier';

const getFormattedCSSWithoutTag = (style: string): Promise<string> => {
  return format(style.replace(/<style.*>([\s\S]*)<\/style>/g, '$1'), { parser: 'css' });
};

describe('format: html', () => {
  it('should return font-face styles', async () => {
    const result = getFontFaceStyles();
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should return font-face styles for china cdn', async () => {
    const result = getFontFaceStyles({ cdn: 'cn' });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return font-face styles', async () => {
    const result = getFontFaceStyles({ format: 'jsx' });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });

  it('should return font-face styles for china cdn', async () => {
    const result = getFontFaceStyles({ format: 'jsx', cdn: 'cn' });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });
});

describe('format: sha256', () => {
  it('should return hash for font-face styles', async () => {
    const result = getFontFaceStyles({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-ogW61KYZUinSA89MAC81+jMsuiqGO8SEOhVYXe974+k='"`);
  });

  it('should return hash for font-face styles for china cdn', async () => {
    const result = getFontFaceStyles({ format: 'sha256', cdn: 'cn' });
    expect(result).toMatchInlineSnapshot(`"'sha256-dIxv2EFLJXQCpZix0U4DOvQvXMk3x4zwPliQo+JKWbc='"`);
  });
});
