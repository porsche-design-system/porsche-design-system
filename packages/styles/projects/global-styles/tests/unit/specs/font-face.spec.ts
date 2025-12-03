import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const readFontFace = () => {
  const themePath = path.resolve(__dirname, '../../../dist/font-face.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const readFontFaceCn = () => {
  const themePath = path.resolve(__dirname, '../../../dist/cn/font-face.css');
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
