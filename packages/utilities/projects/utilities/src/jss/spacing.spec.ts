import { layout, spacing } from './spacing';

it('should contain correct values for spacing', () => {
  expect(spacing).toMatchSnapshot();
});

it('should contain correct values for layout', () => {
  expect(layout).toMatchSnapshot();
});
