import { expect, it } from 'vitest';
import { breakpoint } from './generated';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});
