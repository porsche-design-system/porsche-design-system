import { componentsReady } from '@porsche-design-system/components-js';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-text-list');
  expect(await componentsReady()).toBe(2);

  const els = document.body.querySelectorAll('*');
  expect(els.length).toBe(2);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});
