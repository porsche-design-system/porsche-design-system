import { expect, it } from 'vitest';
import { breakpoint } from './breakpoint';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});
