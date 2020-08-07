import { getPrefixedTagNames } from '../../../src/utils';

describe('getPrefixedTagNames', () => {
  it('should return an object with a mapping from provided tag names to the prefixed ones', () => {
    const resultWithoutPrefix = getPrefixedTagNames(document.createElement('p-button'), ['p-icon', 'p-text']);
    expect(resultWithoutPrefix).toEqual({
      pIcon: 'p-icon',
      pText: 'p-text'
    });

    const resultWithPrefix = getPrefixedTagNames(document.createElement('my-prefix-p-button'), ['p-icon', 'p-text']);
    expect(resultWithPrefix).toEqual({
      pIcon: 'my-prefix-p-icon',
      pText: 'my-prefix-p-text'
    });
  });
});
