import { isSsrHydration } from './is-ssr-hydration';

it('should return true if element has "data-ssr" attribute', () => {
  const el = document.createElement('div');
  el.className = 'hydrated';
  el.setAttribute('data-ssr', '');
  expect(isSsrHydration(el)).toEqual(true);
});

it('should return false if element has no "data-ssr" attribute', () => {
  const el = document.createElement('div');
  el.className = 'hydrated';
  expect(isSsrHydration(el)).toEqual(false);
});
