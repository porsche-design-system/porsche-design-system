import { expect, it } from 'vitest';
import { breakpoint } from '../../../src/mediaQuery';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});
