import fs from 'node:fs';
import path from 'node:path';
import { expect, it } from 'vitest';

const readVariables = () => {
  const themePath = path.resolve(__dirname, '../../../dist/variables.css');
  return fs.readFileSync(themePath, 'utf-8');
};

const variablesCss = readVariables();

it('should match compiled variables css', () => {
  expect(variablesCss).toMatchSnapshot();
});
