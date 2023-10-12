import { setScrollLock } from './setScrollLock';

it('should add correct body styles for parameter: true', () => {
  expect(document.body.getAttribute('style')).toBe(null);
  setScrollLock(true);

  expect(document.body.style.top).toBe('0px');
  expect(document.body.style.overflowY).toBe('scroll');
  expect(document.body.style.position).toBe('fixed');
});

it('should only remove previously added body styles for parameter: false', () => {
  document.body.style.display = 'flex';
  setScrollLock(true);
  setScrollLock(false);

  expect(document.body.style.top).toBe('');
  expect(document.body.style.overflowY).toBe('');
  expect(document.body.style.position).toBe('');
  expect(document.body.getAttribute('style')).toBe('display: flex;');
});
