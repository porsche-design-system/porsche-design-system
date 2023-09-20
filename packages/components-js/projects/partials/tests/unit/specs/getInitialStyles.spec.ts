import { getInitialStyles } from '../../../src';
import { renderToString } from 'react-dom/server';
import { format } from 'prettier';

const getFormattedCSSWithoutTag = (style: string): Promise<string> => {
  return format(style.replace(/<style.*>([\s\S]*)<\/style>/g, '$1'), { parser: 'css' });
};

describe('format: html', () => {
  it('should return core styles', async () => {
    const result = getInitialStyles();
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should return core styles with custom prefix', async () => {
    const result = getInitialStyles({ prefix: 'custom-prefix' });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });

  it('should return core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ prefix: ['', 'some-prefix', 'another-prefix'] });
    expect(result).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(result)).toMatchSnapshot();
  });
});

describe('format: jsx', () => {
  it('should return core styles', async () => {
    const result = getInitialStyles({ format: 'jsx' });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });

  it('should return core styles with custom prefix', async () => {
    const result = getInitialStyles({ format: 'jsx', prefix: 'custom-prefix' });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });

  it('should return core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ format: 'jsx', prefix: ['', 'some-prefix', 'another-prefix'] });
    const html = renderToString(result);
    expect(html).toMatchSnapshot();
    expect(await getFormattedCSSWithoutTag(html)).toMatchSnapshot();
  });
});

describe('format: sha256', () => {
  it('should return hash for core styles', async () => {
    const result = getInitialStyles({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"'sha256-1RWilvSVhGBLU7zmtV867jEbxWejOsenWXeOcJTln/A='"`);
  });

  it('should return hash for core styles with custom prefix', async () => {
    const result = getInitialStyles({ format: 'sha256', prefix: 'custom-prefix' });
    expect(result).toMatchInlineSnapshot(`"'sha256-VOgcNTV/whE7CI0Dtuh4XOzjEE2qxlsHt78VN84AaAs='"`);
  });

  it('should return hash for core styles with multiple custom prefixes', async () => {
    const result = getInitialStyles({ format: 'sha256', prefix: ['', 'some-prefix', 'another-prefix'] });
    expect(result).toMatchInlineSnapshot(`"'sha256-u0QRxwJsnyBE6bAIyEVdi9mhs7RKAfJb0JpUGaSky/8='"`);
  });
});
