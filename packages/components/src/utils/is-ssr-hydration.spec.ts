import { isSsrHydration } from './is-ssr-hydration';

it('should return true if element has "ssr" class', () => {
  const el = document.createElement('div');
  el.className = 'box ssr hydrated';
  expect(isSsrHydration(el)).toEqual(true);
});

it('should return false if element has no "ssr" class', () => {
  const el = document.createElement('div');
  el.className = 'hydrated';
  expect(isSsrHydration(el)).toEqual(false);
});
