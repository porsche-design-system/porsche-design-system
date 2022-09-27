import { getTagName } from './getTagName';

it.each([
  ['div', 'div'],
  ['p-button', 'p-button'],
  ['SPAN', 'span'],
])('should for %s element return %s', (tag, result) => {
  const el = document.createElement(tag);
  expect(getTagName(el)).toBe(result);
});
