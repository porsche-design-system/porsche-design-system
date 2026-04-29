import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const readNormalize = () => {
  const themePath = path.resolve(__dirname, '../../../dist/normalize.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const normalizeCss = readNormalize();

it('should match compiled normalize css', () => {
  expect(normalizeCss).toMatchSnapshot();
});
