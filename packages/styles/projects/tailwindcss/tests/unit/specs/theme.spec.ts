import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';
import { CDN_BASE_URL_CN, CDN_BASE_URL_COM } from '../../../../../../../cdn.config';

const readFile = (file: string) => {
  const themePath = path.resolve(__dirname, `../../../dist/${file}`);
  return fs.readFileSync(themePath, 'utf-8');
};

const tailwindTheme = readFile('index.css');
const tailwindThemeCn = readFile('cn/index.css');

it('should match compiled tailwindcss theme', () => {
  expect(tailwindTheme).toMatchSnapshot();
  expect(tailwindTheme).toContain(CDN_BASE_URL_COM);
  expect(tailwindTheme).not.toContain(CDN_BASE_URL_CN);
});

it('should match compiled tailwindcss cn theme', () => {
  expect(tailwindThemeCn).toMatchSnapshot();
  expect(tailwindThemeCn).toContain(CDN_BASE_URL_CN);
  expect(tailwindThemeCn).not.toContain(CDN_BASE_URL_COM);
});
