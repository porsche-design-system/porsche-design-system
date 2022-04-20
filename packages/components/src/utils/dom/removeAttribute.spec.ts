import { removeAttribute } from './removeAttribute';

it('should remove attribute', () => {
  const element = document.createElement('div');
  element.setAttribute('title', 'Some title');

  removeAttribute(element, 'title');
  expect(element.getAttribute('title')).toBe(null);
});
