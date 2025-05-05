import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('ag-grid package content', () => {
  test('should match content', () => {
    const pkgPath = nodeRequire.resolve('@porsche-design-system/components-js');
    const themeCssPath = path.join(pkgPath, '../../tailwind/theme.css');
    const content = fs.readFileSync(themeCssPath, 'utf8');

    expect(content).toMatchSnapshot();
  });
});
