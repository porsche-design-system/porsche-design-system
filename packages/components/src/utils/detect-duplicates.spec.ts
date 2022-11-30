import { isAlreadyInArray } from './detect-duplicates';

describe('isAlreadyInArray()', () => {
  it.each([
    ['some-element', 0, ['some-element', 'some-element'], true],
    ['some-element', 1, ['some-element', 'some-element'], false],
    ['some-element', 2, ['some-element', 'some-element', 'some-element'], false],
    [1, 0, [1, 1], true],
    [2, 1, [2, 2], false],
    [33, 2, [33, 33, 33], false],
    [true, 0, [true, true], true],
    [true, 1, [true, true], false],
    [false, 2, [false, false, false], false],
    [undefined, 0, [undefined, undefined], true],
    [undefined, 1, [undefined, undefined], false],
    ['some-element', 1, [1, 'some-element', true, undefined], true],
    [1, 0, [1, 'some-element', true, undefined], true],
    [true, 2, [1, 'some-element', true, undefined], true],
    [undefined, 3, [1, 'some-element', true, undefined], true],
  ])('should for value: %s, index: %s, array: %s return %s', (value, index, array, result) => {
    expect(isAlreadyInArray(value, index, array)).toEqual(result);
  });
});
