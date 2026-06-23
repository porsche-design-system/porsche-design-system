import { sync as globbySync } from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';
import { npmDistTmpSubPath } from '../projects/components-wrapper/environment';

const packageDir = path.resolve(__dirname, '..');

// TODO: this should happen during webpack build via define plugin
const readAndWriteFile = (targetFile: string): void => {
  const oldContent = fs.readFileSync(targetFile, 'utf8');
  const [, documentKey] = oldContent.match(/,document\[([a-z])]\.cdn=/) || [];
  const newContent = oldContent.replace(
    '"%%%CDN_BASE_URL_DYNAMIC%%%',
    `document${documentKey ? '[' + documentKey + ']' : '.porscheDesignSystem'}.cdn.url+"`
  );
  fs.writeFileSync(targetFile, newContent);

  console.log(`Updated: ${targetFile.replace(packageDir, '.')}`);
};

const replaceCdnBaseUrlDynamicPlaceholder = () => {
  // resolve everything from this package's own build output (packageDir = packages/components-js).
  // avoids require.resolve('@porsche-design-system/components-js'), which follows the self-symlink
  // differently across install layouts (collapses locally, stays in node_modules on CI).
  const loaderDir = path.resolve(packageDir, 'dist/components-wrapper'); // built core loader (published as components-js)

  [
    path.resolve(loaderDir, 'cjs/index.cjs'), // core loader umd build (package main)
    path.resolve(loaderDir, 'esm/index.mjs'), // core loader esm build
    path.resolve(loaderDir, 'index.js'), // same as umd build but different extension for webpack 4
    path.resolve(packageDir, npmDistTmpSubPath, 'index.js'), // temporary core loader used for getLoaderScript partial
    globbySync(path.resolve(packageDir, 'dist/components/porsche-design-system.v*'))[0], // core chunk on cdn
  ].forEach(readAndWriteFile);

  console.log(`Replaced: "%%%CDN_BASE_URL_DYNAMIC%%%" –> "document.porscheDesignSystem.cdn.url"`);
};

replaceCdnBaseUrlDynamicPlaceholder();
