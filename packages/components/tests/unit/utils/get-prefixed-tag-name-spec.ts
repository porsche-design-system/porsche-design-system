import { getPrefixedTagNames, getAllPrefixedTagNames } from '../../../src/utils';
import { TAG_NAMES } from '../../../src/tags';

describe('getPrefixedTagNames', () => {
  it('should return an object with a mapping from provided tag names to the prefixed ones', () => {
    const resultWithoutPrefix = getPrefixedTagNames(document.createElement('p-button'), ['p-icon', 'p-text']);
    expect(resultWithoutPrefix).toEqual({
      pIcon: 'p-icon',
      pText: 'p-text',
    });

    const resultWithPrefix = getPrefixedTagNames(document.createElement('my-prefix-p-button'), ['p-icon', 'p-text']);
    expect(resultWithPrefix).toEqual({
      pIcon: 'my-prefix-p-icon',
      pText: 'my-prefix-p-text',
    });
  });
});

describe('getAllPrefixedTagNames', () => {
  it('should return an object with a mapping of all tag names to the prefixed ones', () => {
    const resultWithoutPrefix = getAllPrefixedTagNames(document.createElement('p-button'));
    expect(resultWithoutPrefix.pButton).toEqual('p-button');
    expect(Object.keys(resultWithoutPrefix).length).toEqual(TAG_NAMES.length);

    const resultWithPrefix = getAllPrefixedTagNames(document.createElement('my-prefix-p-button'));
    expect(resultWithPrefix.pButton).toEqual('my-prefix-p-button');
    expect(Object.keys(resultWithPrefix).length).toEqual(TAG_NAMES.length);
  });
});
