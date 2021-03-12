import { getPrefixedTagNames } from '../../../src/utils';
import { TAG_NAMES } from '@porsche-design-system/shared';

describe('getPrefixedTagNames', () => {
  it('should return an object with a mapping of all tag names to the prefixed ones', () => {
    const resultWithoutPrefix = getPrefixedTagNames(document.createElement('p-button'));
    expect(resultWithoutPrefix.pButton).toEqual('p-button');
    expect(Object.keys(resultWithoutPrefix).length).toEqual(TAG_NAMES.length);

    const resultWithPrefix = getPrefixedTagNames(document.createElement('my-prefix-p-button'));
    expect(resultWithPrefix.pButton).toEqual('my-prefix-p-button');
    expect(Object.keys(resultWithPrefix).length).toEqual(TAG_NAMES.length);
  });
});
