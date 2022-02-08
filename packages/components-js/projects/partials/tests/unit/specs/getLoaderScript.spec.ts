import { getLoaderScript } from '../../../src';
import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../../../components-wrapper/environment';
import { render } from '@testing-library/react';

const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
const fileContent = fs.readFileSync(tmpFilePath, 'utf8') + 'porscheDesignSystem.load()';

describe('format: html', () => {
  it('should return content of components-js tmp build within script tag', () => {
    const result = getLoaderScript();
    expect(result).toMatch(`<script>${fileContent}</script>`);
  });
});

describe('format: jsx', () => {
  it('should return content of components-js tmp build without script tag', () => {
    const { container } = render(getLoaderScript({ format: 'jsx' }));

    expect(container.innerHTML).toMatch(`<script>${fileContent}</script>`);
  });
});

describe('withoutTags: true', () => {
  it('should return content of components-js tmp build without script tag', () => {
    const result = getLoaderScript({ withoutTags: true });

    expect(result).toMatch(fileContent);
  });
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

it('should not contain componentsReady', () => {
  const result = getLoaderScript();
  expect(result).not.toContain('componentsReady');
});
