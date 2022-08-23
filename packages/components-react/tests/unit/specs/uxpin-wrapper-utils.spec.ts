import { partitionProps } from '../../../projects/uxpin-wrapper/src/form-utils';

const input = { a: 1, b: 2, c: 3 };

it('Should partition a set of props into 2 sets of props', () => {
  expect(partitionProps(input, [])).toEqual([{}, input]);
  expect(partitionProps(input, ['a'])).toEqual([{ a: 1 }, { b: 2, c: 3 }]);
  expect(partitionProps(input, ['a', 'b'])).toEqual([{ a: 1, b: 2 }, { c: 3 }]);
  expect(partitionProps(input, ['a', 'b', 'c'])).toEqual([{ a: 1, b: 2, c: 3 }, {}]);
});
