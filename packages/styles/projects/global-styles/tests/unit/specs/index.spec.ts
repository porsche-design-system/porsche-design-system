import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';
import { CDN_BASE_URL_CN, CDN_BASE_URL_COM } from '../../../../../../../cdn.config';

const readFile = (file: string) => {
  const themePath = path.resolve(__dirname, `../../../dist/${file}`);
  return fs.readFileSync(themePath, 'utf-8');
};

const indexCss = readFile('index.css');
const fontFaceCss = readFile('font-face.css');
const normalizeCss = readFile('normalize.css');
const variablesCss = readFile('variables.css');

const indexCnCss = readFile('cn/index.css');
const fontFaceCnCss = readFile('cn/font-face.css');

it('should match compiled index css', () => {
  expect(indexCss).toMatchSnapshot();
});

it('should match compiled index cn css', () => {
  expect(indexCnCss).toMatchSnapshot();
});

it('should contain all parts in index css', () => {
  expect(indexCss).toContain(fontFaceCss);
  expect(indexCss).toContain(normalizeCss);
  expect(indexCss).toContain(variablesCss);
  expect(indexCss).toContain(CDN_BASE_URL_COM);
  expect(indexCss).not.toContain(CDN_BASE_URL_CN);
});

it('should contain all parts in index cn css', () => {
  expect(indexCnCss).toContain(fontFaceCnCss);
  expect(indexCnCss).toContain(normalizeCss);
  expect(indexCnCss).toContain(variablesCss);
  expect(indexCnCss).toContain(CDN_BASE_URL_CN);
  expect(indexCnCss).not.toContain(CDN_BASE_URL_COM);
});
