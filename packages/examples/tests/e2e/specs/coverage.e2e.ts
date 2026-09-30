import { existsSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { getExamplePages } from '../../vrt/helpers/pages.ts';
import { getSpecPath } from '../helpers/index.ts';

/**
 * Every example has a spec of its own.
 *
 * The specs are written per page rather than generated from the page list, so nothing would notice a new example
 * without one – and that example would then miss even the check that it loads without an error. This file notices.
 */

const examplePages = getExamplePages();

for (const examplePage of examplePages) {
  const specPath = getSpecPath(examplePage);

  test(`${examplePage.id} has a spec of its own in specs/${specPath}`, () => {
    expect(existsSync(path.join(import.meta.dirname, specPath)), `add specs/${specPath}`).toBe(true);
  });
}
