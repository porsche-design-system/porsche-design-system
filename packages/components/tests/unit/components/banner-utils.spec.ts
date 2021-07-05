import { closeStyles } from '../../../src/components/feedback/banner/banner-utils';

it('closeStyles should contain correct css', () => {
  expect(closeStyles).toMatchSnapshot();
});
