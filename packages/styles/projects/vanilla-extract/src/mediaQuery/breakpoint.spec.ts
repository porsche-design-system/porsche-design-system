import { expect, it } from 'vitest';
import { breakpoint } from '.';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});
