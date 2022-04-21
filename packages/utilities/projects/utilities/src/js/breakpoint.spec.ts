import { breakpoint } from './breakpoint';

it('should contain correct values for breakpoint', () => {
  expect(breakpoint).toMatchSnapshot();
});
