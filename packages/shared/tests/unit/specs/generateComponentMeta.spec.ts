import { generateComponentMeta } from '../../../scripts/generateComponentMeta';

it('should match snapshot', () => {
  expect(generateComponentMeta()).toMatchSnapshot();
});
