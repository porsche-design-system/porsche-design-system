import { expect, it } from 'vitest';
import { breakpoints } from './breakpointShared';

it('should contain correct values for breakpoints', () => {
  expect(breakpoints).toMatchSnapshot();
});
