import { existsSync } from 'node:fs';
import path from 'node:path';
import { testCoverage } from '@porsche-design-system/testing';
import { getExamplePages, getSpecPath } from '../../helpers/index.ts';
import { expect, test } from '../helpers/index.ts';

/**
 * Every example has a spec of its own.
 *
 * The specs are written per page rather than generated from the page list, so nothing would notice a new example
 * without one – and that example would then never be scanned. This file notices.
 */

const specPaths = Object.fromEntries(
  getExamplePages().map((examplePage) => [examplePage.id, getSpecPath(examplePage, 'a11y')] as const)
);

testCoverage({
  test,
  expect,
  items: Object.keys(specPaths),
  getMissing: (id) =>
    existsSync(path.join(import.meta.dirname, specPaths[id])) ? undefined : `specs/${specPaths[id]}`,
});
