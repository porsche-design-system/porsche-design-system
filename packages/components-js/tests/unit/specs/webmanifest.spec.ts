import * as path from 'path';
import * as fs from 'fs';
import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';

// TODO: tests are in wrong package
describe('webmanifest', () => {
  const manifestPath = META_ICONS_MANIFEST.webManifest.auto;
  const manifestPathCN = META_ICONS_MANIFEST.webManifest.cn;

  const indexJsFile = require.resolve('@porsche-design-system/meta-icons');
  const distDir = path.resolve(indexJsFile, '../..');
  const metaIconsDir = path.resolve(distDir, 'meta-icons');

  const getManifestContent = (manifestFileName: string): string => {
    return fs.readFileSync(path.resolve(metaIconsDir, manifestFileName), 'utf8');
  };

  it('should have webmanifest contents', () => {
    const expectedResult =
      '{"icons":[{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-192x192.560f2cc094e7b6989c1e927741d57fba.png","sizes":"192x192","type":"image/png"},{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-512x512.28b969b00930c789118a9e9bfd7ecaea.png","sizes":"512x512","type":"image/png"}]}';
    expect(getManifestContent(manifestPath)).toBe(expectedResult);
  });

  it('should have webmanifestCN contents', () => {
    const expectedResult =
      '{"icons":[{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-192x192.560f2cc094e7b6989c1e927741d57fba.png","sizes":"192x192","type":"image/png"},{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-512x512.28b969b00930c789118a9e9bfd7ecaea.png","sizes":"512x512","type":"image/png"}]}';
    expect(getManifestContent(manifestPathCN)).toBe(expectedResult);
  });
});
