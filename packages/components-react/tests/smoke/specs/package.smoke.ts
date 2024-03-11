import * as path from 'path';
import * as fs from 'fs';
import { createRequire } from 'node:module';
import { globbySync } from 'globby';

const nodeRequire = createRequire(import.meta.url);

describe('package content', () => {
  const componentsReactFilePath = nodeRequire.resolve('@porsche-design-system/components-react');
  const componentsReactPackageDir = path.resolve(componentsReactFilePath, '../../ssr');
  const componentsReactFilePaths = globbySync(`${componentsReactPackageDir}/**/*.{js,mjs,cjs}`);

  it.each(
    componentsReactFilePaths.map((filePath) => [
      filePath.replace(componentsReactPackageDir, 'dist/react-wrapper/ssr'),
      filePath,
    ])
  )('should not contain localhost in bundled react-wrapper file: %s', (_, filePath) => {
    const fileContent = fs.readFileSync(path.resolve(componentsReactPackageDir, filePath), 'utf8');
    expect(fileContent).not.toContain('localhost');
  });
});
