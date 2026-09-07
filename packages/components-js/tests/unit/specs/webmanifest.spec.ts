import { META_ICONS_MANIFEST } from '@porsche-design-system/meta-icons';
import * as fs from 'fs';
import * as path from 'path';

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
      '{"icons":[{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-192x192.8f29b66.png","sizes":"192x192","type":"image/png"},{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-512x512.0e1a31f.png","sizes":"512x512","type":"image/png"},{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-maskable-192x192.55af4e4.png","sizes":"192x192","type":"image/png","purpose":"maskable"},{"src":"https://cdn.ui.porsche.com/porsche-design-system/meta-icons/android-chrome-maskable-512x512.b257161.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}';
    expect(getManifestContent(manifestPath)).toBe(expectedResult);
  });

  it('should have webmanifestCN contents', () => {
    const expectedResult =
      '{"icons":[{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-192x192.8f29b66.png","sizes":"192x192","type":"image/png"},{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-512x512.0e1a31f.png","sizes":"512x512","type":"image/png"},{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-maskable-192x192.55af4e4.png","sizes":"192x192","type":"image/png","purpose":"maskable"},{"src":"https://cdn.ui.porsche.cn/porsche-design-system/meta-icons/android-chrome-maskable-512x512.b257161.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}';
    expect(getManifestContent(manifestPathCN)).toBe(expectedResult);
  });

  it.each([manifestPath, manifestPathCN])(
    'should copy %s and its referenced icons to the CDN directory',
    (filename) => {
      const cdnDir = path.resolve(distDir, '../../../cdn/meta-icons');
      const content = getManifestContent(filename);
      expect(fs.readFileSync(path.resolve(cdnDir, filename), 'utf8')).toBe(content);

      const manifest: { icons: { src: string }[] } = JSON.parse(content);
      for (const { src } of manifest.icons) {
        const iconFilename = path.basename(new URL(src).pathname);
        const sourceFilename = `${iconFilename.split('.')[0]}.png`;
        const source = fs.readFileSync(path.resolve(distDir, '../src/touch-icon', sourceFilename));

        expect(fs.readFileSync(path.resolve(metaIconsDir, iconFilename))).toEqual(source);
        expect(fs.readFileSync(path.resolve(cdnDir, iconFilename))).toEqual(source);
      }
    }
  );
});
