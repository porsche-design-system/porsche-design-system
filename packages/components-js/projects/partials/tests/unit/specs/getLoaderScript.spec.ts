import { getLoaderScript } from '../../../src';
import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../../../components-wrapper/environment';
import { render } from '@testing-library/react';

const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../../..');
const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
const fileContent = fs.readFileSync(tmpFilePath, 'utf8') + 'porscheDesignSystem.load()';

jest.mock('../../../src/shared');

it('should not contain componentsReady', () => {
  const result: string = getLoaderScript();
  expect(result).not.toContain('componentsReady');
});

describe('format: html', () => {
  it('should return content of components-js tmp build within script tag', () => {
    const result: string = getLoaderScript();
    expect(result).toBe(`<script data-pds-loader-script>${fileContent}</script>`);
  });

  it('should call load method with supplied prefix', () => {
    const result: string = getLoaderScript({ prefix: 'my-prefix' });
    expect(result.endsWith("porscheDesignSystem.load({prefix:'my-prefix'})</script>")).toBe(true);
  });

  it('should call load method with supplied prefixes', () => {
    const result: string = getLoaderScript({ prefix: ['my-prefix', 'another-prefix'] });
    expect(
      result.endsWith(
        "porscheDesignSystem.load({prefix:'my-prefix'});porscheDesignSystem.load({prefix:'another-prefix'})</script>"
      )
    ).toBe(true);
  });
});

describe('format: jsx', () => {
  it('should return content of components-js tmp build within script tag', () => {
    const result: JSX.Element = getLoaderScript({ format: 'jsx' });
    const { container } = render(result);
    expect(container.innerHTML).toBe(`<script data-pds-loader-script="">${fileContent}</script>`);
  });

  it('should call load method with supplied prefix', () => {
    const result: JSX.Element = getLoaderScript({ format: 'jsx', prefix: 'my-prefix' });
    const { container } = render(result);
    expect(container.innerHTML.endsWith("porscheDesignSystem.load({prefix:'my-prefix'})</script>")).toBe(true);
  });

  it('should call load method with supplied prefixes', () => {
    const result: JSX.Element = getLoaderScript({ format: 'jsx', prefix: ['my-prefix', 'another-prefix'] });
    const { container } = render(result);
    expect(
      container.innerHTML.endsWith(
        "porscheDesignSystem.load({prefix:'my-prefix'});porscheDesignSystem.load({prefix:'another-prefix'})</script>"
      )
    ).toBe(true);
  });
});
