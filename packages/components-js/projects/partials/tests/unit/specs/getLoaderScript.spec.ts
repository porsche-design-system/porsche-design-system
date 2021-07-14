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

  it('should return content of components-js tmp build without script tag', () => {
    const result = getLoaderScript({ withoutTags: true });
    expect(result).toMatch(fileContent);
  });

  it('should not contain componentsReady', () => {
    const result = getLoaderScript();
    expect(result).not.toContain('componentsReady');
  });
});
