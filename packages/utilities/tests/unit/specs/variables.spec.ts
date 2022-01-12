import { color, font, layout, spacing } from '../../../projects/utilities/src/js/variables';

it('should contain correct values for color', () => {
  expect(color).toMatchSnapshot();
});

it('should contain correct values for font', () => {
  expect(font).toMatchSnapshot();
});

it('should contain correct values for spacing', () => {
  expect(spacing).toMatchSnapshot();
});

it('should contain correct values for layout', () => {
  expect(layout).toMatchSnapshot();
});
