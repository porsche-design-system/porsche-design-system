import * as fs from 'node:fs';
import { expect, it } from 'vitest';
import { scssFileMeta } from '../../../src/scss';
import { fileMap } from '../../../scripts/fileMap';

// Output-parity seam: snapshot every generated partial — the meta-driven composition files plus the
// legacy per-domain generators still awaiting migration.
const scssFiles = [...scssFileMeta.map(({ file }) => file), ...Object.keys(fileMap)].map(
  (fileName) => `./dist/${fileName}`
);

it.each(scssFiles)('should contain correct scss content for file %s', (file) => {
  expect(fs.readFileSync(file, 'utf8')).toMatchSnapshot();
});
