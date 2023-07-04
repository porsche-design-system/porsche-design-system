import * as path from 'path';
import * as fs from 'fs';
import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';

// TODO: tests are in wrong package
describe('webmanifest', () => {
  const manifestPath = META_ICONS_MANIFEST.webManifest.auto;
  const manifestPathCN = META_ICONS_MANIFEST.webManifest.cn;

  const indexJsFile = require.resolve('@porsche-design-system/meta-icons');
  const distDir = path.resolve(indexJsFile, '..');
  const metaIconsDir = path.resolve(distDir, 'meta-icons');

  const getManifestContent = (manifestFileName: string): string => {
    return fs.readFileSync(path.resolve(metaIconsDir, manifestFileName), 'utf8');
  };

  it('should have webmanifest contents', () => {
    const expectedResult =
      '{"icons":[{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-192x192.8f29b66ad42359877d4bed4fb1476154.png","sizes":"192x192","type":"image/png"},{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-512x512.0e1a31fe501bd575b2455dc652bfd961.png","sizes":"512x512","type":"image/png"}]}';
    expect(getManifestContent(manifestPath)).toBe(expectedResult);
  });

  it('should have webmanifestCN contents', () => {
    const expectedResult =
      '{"icons":[{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-192x192.8f29b66ad42359877d4bed4fb1476154.png","sizes":"192x192","type":"image/png"},{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-512x512.0e1a31fe501bd575b2455dc652bfd961.png","sizes":"512x512","type":"image/png"}]}';
    expect(getManifestContent(manifestPathCN)).toBe(expectedResult);
  });
});
