import { componentMeta } from '../../../src';

it('should match snapshot', () => {
  expect(componentMeta).toMatchSnapshot();
});
