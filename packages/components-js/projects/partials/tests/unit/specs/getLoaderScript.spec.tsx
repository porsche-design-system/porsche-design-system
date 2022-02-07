import { getLoaderScript } from '../../../src';
import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../../../components-wrapper/environment';

describe('getLoaderScript()', () => {
  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8') + 'porscheDesignSystem.load()';

  it('should return content of components-js tmp build within script tag', () => {
    const result = getLoaderScript();
    expect(result).toMatch(`<script>${fileContent}</script>`);
  });

  describe('withoutTags', () => {
    it('should return content of components-js tmp build without script tag', () => {
      const result = getLoaderScript({ withoutTags: true });

      expect(result).toMatch(fileContent);
    });

    it('should call load method with supplied prefix', () => {
      const result = getLoaderScript({ withoutTags: true, prefix: 'my-prefix' });

      expect(result.endsWith("porscheDesignSystem.load({prefix:'my-prefix'})")).toBe(true);
    });

    it('should call load method with supplied prefixes', () => {
      const result = getLoaderScript({ withoutTags: true, prefix: ['my-prefix', 'another-prefix'] });

      expect(
        result.endsWith(
          "porscheDesignSystem.load({prefix:'my-prefix'});porscheDesignSystem.load({prefix:'another-prefix'})"
        )
      ).toBe(true);
    });
  });

  describe('format jsx', () => {
    it('should return content of components-js tmp build without script tag', () => {
      const result = getLoaderScript({ format: 'jsx' });

      expect(result).toEqual(<script dangerouslySetInnerHTML={{ __html: fileContent }} />);
    });
  });

  it('should not contain componentsReady', () => {
    const result = getLoaderScript();
    expect(result).not.toContain('componentsReady');
  });
});
