import { getInitialStyles } from '../../../src';

it('format: html', () => {
  expect(getInitialStyles).toThrowErrorMatchingSnapshot();
});
