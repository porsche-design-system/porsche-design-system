import { hasAttribute } from './hasAttribute';

it('should return true if attribute exists', () => {
  const element = document.createElement('div');
  element.setAttribute('title', 'Some title');
  expect(hasAttribute(element, 'title')).toBe(true);
});

it('should return false if attribute does not exist', () => {
  const element = document.createElement('div');
  expect(hasAttribute(element, 'title')).toBe(false);
});
