import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const readFile = (file: string) => {
  const themePath = path.resolve(__dirname, `../../../dist/${file}`);
  return fs.readFileSync(themePath, 'utf-8');
};

const tailwindTheme = readFile('index.css');

it('should match compiled tailwindcss theme', () => {
  expect(tailwindTheme).toMatchSnapshot();
});
