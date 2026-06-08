import { expect, it } from 'vitest';
import { breakpoints } from '../../../src/mediaQuery/breakpointShared';

it('should contain correct values for breakpoints', () => {
  expect(breakpoints).toMatchSnapshot();
});
