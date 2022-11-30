import { PARTIAL_NAMES } from '../../../src';

it('should match snapshot', () => {
  expect(PARTIAL_NAMES).toMatchSnapshot();
});
