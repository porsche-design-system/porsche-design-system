import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const nodeRequire = createRequire(import.meta.url);

describe('tailwind package content', () => {
  test('should match content', () => {
    const pkgPath = nodeRequire.resolve('@porsche-design-system/components-js');
    const themeCssPath = path.join(pkgPath, '../../tailwind/index.css');
    const content = fs.readFileSync(themeCssPath, 'utf8');

    expect(content).toMatchSnapshot();
  });
});
