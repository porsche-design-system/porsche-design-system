import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const readFouc = () => {
  const themePath = path.resolve(__dirname, '../../../dist/fouc.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const foucCss = readFouc();

it('should match compiled fouc css', () => {
  expect(foucCss).toMatchSnapshot();
});
