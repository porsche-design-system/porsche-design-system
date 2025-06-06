import fs from 'node:fs';
import path from 'node:path';
import { it, expect } from 'vitest';

const readTheme = () => {
  const themePath = path.resolve(__dirname, '../../../dist/index.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const tailwindTheme = readTheme();

it('should match compiled tailwindcss theme', () => {
  expect(tailwindTheme).toMatchSnapshot();
});
