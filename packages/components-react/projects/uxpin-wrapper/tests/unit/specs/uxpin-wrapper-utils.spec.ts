import { partitionProps } from '../../../src/form-utils';

const input = { a: 1, b: 2, c: 3 };

it('Should partition a set of props into 2 sets of props', () => {
  expect(partitionProps(input, [])).toEqual([input, {}]);
  expect(partitionProps(input, ['a'])).toEqual([{ b: 2, c: 3 }, { a: 1 }]);
  expect(partitionProps(input, ['a', 'b'])).toEqual([{ c: 3 }, { a: 1, b: 2 }]);
  expect(partitionProps(input, ['a', 'b', 'c'])).toEqual([{}, { a: 1, b: 2, c: 3 }]);
});
