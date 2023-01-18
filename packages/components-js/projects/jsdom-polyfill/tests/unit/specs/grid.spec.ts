import { componentsReady } from '@porsche-design-system/components-js';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-grid');
  expect(await componentsReady()).toBe(3);

  const els = document.body.querySelectorAll('*');
  expect(els.length).toBe(3);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});
