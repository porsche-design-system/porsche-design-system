import { createRequire } from 'node:module';
import * as path from 'path';
import { describe, expect, test } from 'vitest';
import { publint } from 'publint';

const nodeRequire = createRequire(import.meta.url);
const pkgDir = path.dirname(nodeRequire.resolve('@porsche-design-system/components-js/package.json'));

describe('publint', () => {
  test('should have no publint errors or warnings', async () => {
    const { messages } = await publint({ pkgDir });
    const problems = messages.filter(
      (m) =>
        (m.type === 'error' || m.type === 'warning') &&
        // .d.ts works fine for both CJS and ESM resolution in practice
        m.code !== 'EXPORTS_TYPES_INVALID_FORMAT' &&
        // jsdom-polyfill intentionally uses "default" with a .cjs file to serve both ESM and CJS consumers
        !(m.code === 'CJS_WITH_ESMODULE_DEFAULT_EXPORT' && m.path?.includes('./jsdom-polyfill'))
    );

    if (problems.length) {
      console.error('publint problems:', problems);
    }

    expect(problems).toHaveLength(0);
  });
});
