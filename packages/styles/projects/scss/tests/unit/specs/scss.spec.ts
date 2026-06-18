import * as fs from 'node:fs';
import { expect, it } from 'vitest';
import { scssFileMeta } from '../../../src/scss';

// Output-parity seam: snapshot every generated partial. The build now runs entirely off the
// meta-driven composition layer, so the file list is keyed off `scssFileMeta` alone.
const scssFiles = scssFileMeta.map(({ file }) => `./dist/${file}`);

it.each(scssFiles)('should contain correct scss content for file %s', (file) => {
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot();
});
