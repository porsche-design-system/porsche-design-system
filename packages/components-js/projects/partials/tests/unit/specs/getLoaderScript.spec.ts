import { getLoaderScript } from '../../../src';
import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../../../components-wrapper/environment';
import { renderToString } from 'react-dom/server';

const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../../..');
const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
const fileContent = fs.readFileSync(tmpFilePath, 'utf8') + 'porscheDesignSystem.load()';

it('should not contain componentsReady', () => {
  const result = getLoaderScript();
  expect(result).not.toContain('componentsReady');
});

describe('format: html', () => {
  it('should return content of components-js tmp build within script tag', () => {
    const result = getLoaderScript();
    expect(result).toBe(`<script data-pds-loader-script>${fileContent}</script>`);
  });

  it('should call load method with supplied prefix', () => {
    const result = getLoaderScript({ prefix: 'my-prefix' });
    expect(result.endsWith("porscheDesignSystem.load({prefix:'my-prefix'})</script>")).toBe(true);
  });

  it('should call load method with supplied prefixes', () => {
    const result = getLoaderScript({ prefix: ['my-prefix', 'another-prefix'] });
    expect(
      result.endsWith(
        "porscheDesignSystem.load({prefix:'my-prefix'});porscheDesignSystem.load({prefix:'another-prefix'})</script>"
      )
    ).toBe(true);
  });
});

describe('format: jsx', () => {
  it('should return content of components-js tmp build within script tag', () => {
    const result = getLoaderScript({ format: 'jsx' });
    expect(renderToString(result)).toBe(`<script data-pds-loader-script="">${fileContent}</script>`);
  });

  it('should call load method with supplied prefix', () => {
    const result = getLoaderScript({ format: 'jsx', prefix: 'my-prefix' });
    expect(renderToString(result).endsWith("porscheDesignSystem.load({prefix:'my-prefix'})</script>")).toBe(true);
  });

  it('should call load method with supplied prefixes', () => {
    const result = getLoaderScript({ format: 'jsx', prefix: ['my-prefix', 'another-prefix'] });
    expect(
      renderToString(result).endsWith(
        "porscheDesignSystem.load({prefix:'my-prefix'});porscheDesignSystem.load({prefix:'another-prefix'})</script>"
      )
    ).toBe(true);
  });
});

describe('format: sha256', () => {
  it('should return hash for content of components-js tmp build', () => {
    const result = getLoaderScript({ format: 'sha256' });
    expect(result).toMatchInlineSnapshot(`"sha256-4H7cR8zFLzNqz3S+eTyenFM8cnehZEsaLTmQxPH2mes="`);
  });

  it('should return hash for content of components-js tmp build with load method prefix call', () => {
    const result = getLoaderScript({ format: 'sha256', prefix: 'my-prefix' });
    expect(result).toMatchInlineSnapshot(`"sha256-T+G3KO+JyFb/XEhizemRMbby2nevwJapsdrbSaEeRhQ="`);
  });

  it('should return hash for content of components-js tmp build with load method prefix calls', () => {
    const result = getLoaderScript({ format: 'sha256', prefix: ['my-prefix', 'another-prefix'] });
    expect(result).toMatchInlineSnapshot(`"sha256-8fE6xtW4xIM+eMT4ix1j6Nef3MfKgbs8M5pf5+8QUUw="`);
  });
});
