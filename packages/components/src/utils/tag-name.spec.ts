import { TAG_NAMES } from '@porsche-design-system/shared';
import { vi } from 'vitest';
import { getPrefixedTagNames, getTagName, getTagNameWithoutPrefix, PREFIXED_TAG_NAMES_CACHE } from './tag-name';

describe('getTagName()', () => {
  it.each([
    ['div', 'div'],
    ['p-button', 'p-button'],
    ['SPAN', 'span'],
  ])('should for %s element return %s', (tag, result) => {
    const el = document.createElement(tag);
    expect(getTagName(el)).toBe(result);
  });
});

describe('getTagNameWithoutPrefix()', () => {
  it.each([
    ['p-some-element', 'p-some-element'],
    ['p-some-other-element', 'p-some-other-element'],
    ['my-prefix-p-some-element', 'p-some-element'],
    ['my-other-prefix-p-some-element', 'p-some-element'],
    ['my-prefix-p-some-other-element', 'p-some-other-element'],
    ['div', 'div'],
    ['h1', 'h1'],
  ])('should for %s element return %s', (tag, result) => {
    const el = document.createElement(tag);
    expect(getTagNameWithoutPrefix(el)).toBe(result);
  });
});

describe('getPrefixedTagNames()', () => {
  beforeEach(() => {
    PREFIXED_TAG_NAMES_CACHE.clear();
  });

  it('should return an object with a mapping of all tag names to the prefixed ones', () => {
    const resultWithoutPrefix = getPrefixedTagNames(document.createElement('p-button'));
    expect(resultWithoutPrefix.pButton).toEqual('p-button');
    expect(Object.keys(resultWithoutPrefix).length).toEqual(TAG_NAMES.length - 3); // without p-text, p-heading and p-display

    const resultWithPrefix = getPrefixedTagNames(document.createElement('my-prefix-p-button'));
    expect(resultWithPrefix.pButton).toEqual('my-prefix-p-button');
    expect(Object.keys(resultWithPrefix).length).toEqual(TAG_NAMES.length - 3); // without p-text, p-heading and p-display
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
    const spy = vi.spyOn(PREFIXED_TAG_NAMES_CACHE, 'set');
    getPrefixedTagNames(document.createElement('p-button'));
    getPrefixedTagNames(document.createElement('p-button'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
