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
    let consoleWarnSpy;

    beforeEach(() => (consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})));
    afterEach(() => jest.clearAllMocks());

    it('should return content of components-js tmp build without script tag', () => {
      const result = getLoaderScript({ withoutTags: true });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getLoaderScript() is deprecated and will be removed in v3'
      );
      expect(result).toMatch(fileContent);
    });

    it('should call load method with supplied prefix', () => {
      const result = getLoaderScript({ withoutTags: true, prefix: 'my-prefix' });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getLoaderScript() is deprecated and will be removed in v3'
      );
      expect(result.endsWith("porscheDesignSystem.load({prefix:'my-prefix'})")).toBe(true);
    });

    it('should call load method with supplied prefixes', () => {
      const result = getLoaderScript({ withoutTags: true, prefix: ['my-prefix', 'another-prefix'] });

      expect(consoleWarnSpy).toBeCalledWith(
        'The option "{ withoutTags: true }" of partial getLoaderScript() is deprecated and will be removed in v3'
      );
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

      expect(result).toMatchSnapshot();
    });

    it('should call load method with supplied prefix', () => {
      const result = getLoaderScript({ format: 'jsx', prefix: 'my-prefix' });

      expect(result).toMatchSnapshot();
    });

    it('should call load method with supplied prefixes', () => {
      const result = getLoaderScript({ format: 'jsx', prefix: ['my-prefix', 'another-prefix'] });

      expect(result).toMatchSnapshot();
    });
  });

  it('should not contain componentsReady', () => {
    const result = getLoaderScript();
    expect(result).not.toContain('componentsReady');
  });
});
