import * as path from 'path';
import * as globby from 'globby';
import * as fs from 'fs';

describe('package content', () => {
  const componentsJsFilePath = require.resolve('@porsche-design-system/components-js');
  const componentsJsPackageDir = path.resolve(componentsJsFilePath, '..');
  const componentsJsFilePaths = globby.sync(`${componentsJsPackageDir}/**/*.js`);

  const componentsReactFilePath = require.resolve('@porsche-design-system/components-react');
  const componentsReactPackageDir = path.resolve(componentsReactFilePath, '..');
  const componentsReactFilePaths = globby.sync(`${componentsReactPackageDir}/**/*.js`);

  it.each(
    componentsJsFilePaths.map((filePath) => [
      filePath.replace(componentsJsPackageDir, 'dist/components-wrapper'),
      filePath,
    ])
  )('should not contain CDN_BASE_URL_DYNAMIC placeholder or localhost in bundled js file: %s', (_, filePath) => {
    const fileContent = fs.readFileSync(path.resolve(componentsJsPackageDir, filePath), 'utf8');
    expect(fileContent).not.toContain('CDN_BASE_URL_DYNAMIC');
    expect(fileContent).not.toContain('localhost');
  });

  it.each(
    componentsReactFilePaths.map((filePath) => [
      filePath.replace(componentsReactPackageDir, 'dist/react-wrapper'),
      filePath,
    ])
  )('should not contain localhost in bundled react-wrapper file: %s', (_, filePath) => {
    const fileContent = fs.readFileSync(path.resolve(componentsReactPackageDir, filePath), 'utf8');
    expect(fileContent).not.toContain('localhost');
  });
});
