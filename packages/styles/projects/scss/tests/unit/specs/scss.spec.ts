import * as fs from 'node:fs';
import { expect, it } from 'vitest';
import { scssFileMeta } from '../../../src/scss';

const scssFiles = scssFileMeta.map(({ file }) => `./dist/${file}`);

it.each(scssFiles)('should contain correct scss content for file %s', (file) => {
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot();
});
