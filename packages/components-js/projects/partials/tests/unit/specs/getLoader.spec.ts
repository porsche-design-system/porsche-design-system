import { getLoader } from '../../../src';
import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../../../../components-wrapper/environment';

describe('getLoader()', () => {
  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const packageDir = path.resolve(path.dirname(componentsJsFilePath), '../..');
  const tmpFilePath = path.resolve(packageDir, npmDistTmpSubPath, 'index.js');
  const fileContent = fs.readFileSync(tmpFilePath, 'utf8');

  it('should return content of components-js tmp build within script tag', () => {
    const result = getLoader();
    expect(result).toMatch(`<script>${fileContent}</script>`);
  });

  it('should return content of components-js tmp build without script tag', () => {
    const result = getLoader({ withoutTags: true });
    expect(result).toMatch(fileContent);
  });

  it('should not contain componentsReady', () => {
    const result = getLoader();
    expect(result).not.toContain('componentsReady');
  });
});
