import { preventFoucOfNestedElementsStyles } from './prevent-fouc-of-nested-elements-styles';

it('should return correct jss styles', () => {
  expect(preventFoucOfNestedElementsStyles).toMatchSnapshot();
});
