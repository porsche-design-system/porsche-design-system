import { getPrefixedTagNames, getTagName, getTagNameWithoutPrefix, PREFIXED_TAG_NAMES_CACHE } from './tag-name';
import { TAG_NAMES } from '@porsche-design-system/shared';

describe('getTagName()', () => {
  it.each([
    ['div', 'div'],
    ['p-button', 'p-button'],
    ['SPAN', 'span'],
  ])('should be called with %s and return %s', (tag, result) => {
    const el = document.createElement(tag);
    expect(getTagName(el)).toBe(result);
  });
});

describe('getPrefixedTagNames()', () => {
  beforeEach(() => {
    PREFIXED_TAG_NAMES_CACHE.clear();
  });

  it('should return an object with a mapping of all tag names to the prefixed ones', () => {
    const resultWithoutPrefix = getPrefixedTagNames(document.createElement('p-button'));
    expect(resultWithoutPrefix.pButton).toEqual('p-button');
    expect(Object.keys(resultWithoutPrefix).length).toEqual(TAG_NAMES.length);

    const resultWithPrefix = getPrefixedTagNames(document.createElement('my-prefix-p-button'));
    expect(resultWithPrefix.pButton).toEqual('my-prefix-p-button');
    expect(Object.keys(resultWithPrefix).length).toEqual(TAG_NAMES.length);
  });

  it('should cache result', () => {
    expect(PREFIXED_TAG_NAMES_CACHE.size).toEqual(0);
    getPrefixedTagNames(document.createElement('p-button'));
    expect(PREFIXED_TAG_NAMES_CACHE.has('')).toEqual(true);
    expect(PREFIXED_TAG_NAMES_CACHE.size).toEqual(1);
  });

  it('should not cache result for identical prefix', () => {
    getPrefixedTagNames(document.createElement('p-button'));
    getPrefixedTagNames(document.createElement('p-button'));
    expect(PREFIXED_TAG_NAMES_CACHE.has('')).toEqual(true);
    expect(PREFIXED_TAG_NAMES_CACHE.size).toEqual(1);
  });

  it('should extend cache on 2nd call for different prefix', () => {
    getPrefixedTagNames(document.createElement('p-button'));
    getPrefixedTagNames(document.createElement('pux-p-button'));
    expect(PREFIXED_TAG_NAMES_CACHE.has('')).toEqual(true);
    expect(PREFIXED_TAG_NAMES_CACHE.has('pux')).toEqual(true);
    expect(PREFIXED_TAG_NAMES_CACHE.size).toEqual(2);
  });

  it('should return cached result after first call', () => {
    const spy = jest.spyOn(PREFIXED_TAG_NAMES_CACHE, 'set');
    getPrefixedTagNames(document.createElement('p-button'));
    getPrefixedTagNames(document.createElement('p-button'));
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe('getTagNameWithoutPrefix()', () => {
  it('should return tag name without prefix', () => {
    expect(getTagNameWithoutPrefix(document.createElement('p-some-element'))).toBe('p-some-element');
    expect(getTagNameWithoutPrefix(document.createElement('p-some-other-element'))).toBe('p-some-other-element');
    expect(getTagNameWithoutPrefix(document.createElement('my-prefix-p-some-element'))).toBe('p-some-element');
    expect(getTagNameWithoutPrefix(document.createElement('my-other-prefix-p-some-element'))).toBe('p-some-element');
    expect(getTagNameWithoutPrefix(document.createElement('my-prefix-p-some-other-element'))).toBe(
      'p-some-other-element'
    );
  });
});
