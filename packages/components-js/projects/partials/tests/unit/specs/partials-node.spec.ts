/**
 * @jest-environment node
 */

import { getInitialStyles } from '../../../src';

it('format: html', () => {
  expect(getInitialStyles).not.toThrow();
});
