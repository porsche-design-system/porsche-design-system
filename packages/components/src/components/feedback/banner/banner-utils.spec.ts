import { closeStyles } from './banner-utils';

it('closeStyles should contain correct css', () => {
  expect(closeStyles).toMatchSnapshot();
});
