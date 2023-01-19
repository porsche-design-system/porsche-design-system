import { componentsReady } from '@porsche-design-system/components-js';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-table');
  expect(await componentsReady()).toBe(7);

  const els = document.body.querySelectorAll('*');
  expect(els.length).toBe(7);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});
