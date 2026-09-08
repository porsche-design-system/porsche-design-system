import * as path from 'node:path';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('scss package content', () => {
  test(`should match content`, () => {
    const pkgJsonPath = nodeRequire.resolve('@porsche-design-system/components-js/package.json');
    const pkgRoot = path.dirname(pkgJsonPath);
    const scssPath = path.join(pkgRoot, 'scss', '_index.scss');

    expect(fs.existsSync(scssPath)).toBe(true);
    const content = fs.readFileSync(scssPath, 'utf-8');
    expect(content).toMatchSnapshot();
  });
});
