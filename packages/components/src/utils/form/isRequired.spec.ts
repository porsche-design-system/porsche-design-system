import { isRequired } from './isRequired';

it('should return true if required property is true on element', () => {
  const el = document.createElement('input');
  el.required = true;
  expect(isRequired(el)).toBe(true);
});

it('should return true if required attribute is empty string on element', () => {
  const el = document.createElement('input');
  el.setAttribute('required', '');
  expect(isRequired(el)).toBe(true);
});

it('should return true if required attribute is any string on element', () => {
  const el = document.createElement('input');
  el.setAttribute('required', 'false');
  expect(isRequired(el)).toBe(true);
});

it('should return false if required attribute or property is missing on element', () => {
  const el = document.createElement('input');
  expect(isRequired(el)).toBe(false);
});

it('should return false if required property is false on element', () => {
  const el = document.createElement('input');
  el.required = false;
  expect(isRequired(el)).toBe(false);
});
