import { getTagNameWithoutPrefix } from './getTagNameWithoutPrefix';

it.each([
  ['p-some-element', 'p-some-element'],
  ['p-some-other-element', 'p-some-other-element'],
  ['my-prefix-p-some-element', 'p-some-element'],
  ['my-other-prefix-p-some-element', 'p-some-element'],
  ['my-prefix-p-some-other-element', 'p-some-other-element'],
])('should for %s element return %s', (tag, result) => {
  const el = document.createElement(tag);
  expect(getTagNameWithoutPrefix(el)).toBe(result);
});
