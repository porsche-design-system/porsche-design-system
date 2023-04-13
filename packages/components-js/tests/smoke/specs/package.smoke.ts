import * as path from 'path';
import * as globby from 'globby';
import * as fs from 'fs';

describe('package content', () => {
  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const componentsJsPackageDir = path.resolve(componentsJsFilePath, '..');
  const filePaths = globby.sync(`${componentsJsPackageDir}/**/*.js`);

  it.each(filePaths.map((filePath) => [filePath.replace(componentsJsPackageDir, 'dist/components-wrapper'), filePath]))(
    'should not contain CDN_BASE_URL_DYNAMIC placeholder or localhost in bundled js file: %s',
    (_, filePath) => {
      const fileContent = fs.readFileSync(path.resolve(componentsJsPackageDir, filePath), 'utf8');
      expect(fileContent).not.toContain('CDN_BASE_URL_DYNAMIC');
      expect(fileContent).not.toContain('localhost');
    }
  );
});
