import { createRequire } from 'node:module';
import * as path from 'path';
import { describe, expect, test } from 'vitest';
import { publint } from 'publint';

const nodeRequire = createRequire(import.meta.url);
const pkgDir = path.dirname(nodeRequire.resolve('@porsche-design-system/components-js/package.json'));

describe('publint', () => {
  test('should have no publint errors or warnings', async () => {
    const { messages } = await publint({ pkgDir });
    const problems = messages.filter((m) => m.type === 'error' || m.type === 'warning');

    if (problems.length) {
      console.error('publint problems:', problems);
    }

    expect(problems).toHaveLength(0);
  });
});


