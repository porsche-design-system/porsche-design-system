import { existsSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { getExamplePages, getSpecPath } from '../../helpers/index.ts';

/**
 * Every example has a spec of its own.
 *
 * The specs are written per page rather than generated from the page list, so nothing would notice a new example
 * without one – and that example would then have no baseline at all. This file notices.
 */

for (const examplePage of getExamplePages()) {
  const specPath = getSpecPath(examplePage, 'vrt');

  test(`${examplePage.id} has a spec of its own in specs/${specPath}`, () => {
    expect(existsSync(path.join(import.meta.dirname, specPath)), `add specs/${specPath}`).toBe(true);
  });
}
