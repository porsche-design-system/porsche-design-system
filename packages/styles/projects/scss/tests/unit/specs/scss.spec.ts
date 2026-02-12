import * as fs from 'fs';
import { expect, it } from 'vitest';
import { fileMap } from '../../../scripts/fileMap';

const scssFiles = Object.keys(fileMap).map((fileName) => `./dist/${fileName}`);

it.each(scssFiles)('should contain correct scss content for file %s', (file) => {
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot();
});
