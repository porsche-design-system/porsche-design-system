import { TAG_NAMES_WITH_CHUNK } from '../../../src';

it('should match snapshot', () => {
  expect(TAG_NAMES_WITH_CHUNK).toMatchSnapshot();
});
