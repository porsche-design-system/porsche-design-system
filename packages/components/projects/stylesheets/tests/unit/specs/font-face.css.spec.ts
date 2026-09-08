import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const readFontFace = () => {
  const themePath = path.resolve(__dirname, '../../../lib/font-face.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const readFontFaceCn = () => {
  const themePath = path.resolve(__dirname, '../../../lib/cn/font-face.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const fontFaceCss = readFontFace();
const fontFaceCnCss = readFontFaceCn();

it('should match compiled font-face css', () => {
  expect(fontFaceCss).toMatchSnapshot();
});

it('should match compiled font-face cn css', () => {
  expect(fontFaceCnCss).toMatchSnapshot();
});

it.each(['font-face.css', 'cn/font-face.css', 'index.css', 'cn/index.css'])(
  'should resolve every font URL in %s to a bundled font',
  (file) => {
    const stylesheetPath = path.resolve(__dirname, '../../../lib', file);
    const css = fs.readFileSync(stylesheetPath, 'utf8');
    const urls = Array.from(css.matchAll(/url\(([^)]+)\)/g), ([, url]) => url.replace(/['"]/g, ''));

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(url).toMatch(/^\.\.?\/fonts\/[^/]+\.woff2$/);
      const font = fs.readFileSync(path.resolve(path.dirname(stylesheetPath), url));
      expect(font.length).toBeGreaterThan(0);
    }
  }
);
