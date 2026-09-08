import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, test } from 'vitest';

const distDir = path.resolve(__dirname, '../../../../dist/angular-wrapper');

describe('angular-wrapper distribution files', () => {
  test.each(['package.json', 'README.md', 'CHANGELOG.md', 'LICENSE.md', 'OSS_NOTICE'])(
    'should contain %s',
    (file) => {
      expect(fs.existsSync(path.resolve(distDir, file))).toBe(true);
    },
  );
});
