import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-text-list');
  expect(await componentsReady()).toBe(2);

  const els = document.body.querySelectorAll('p-text-list,p-text-list-item');
  expect(els.length).toBe(2);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should expose its list to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-text-list');
  await componentsReady();

  expect(screen.queryAllByRole('list')).toHaveLength(0);
  expect(screen.getAllByShadowRole('list')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-text-list');
  expect(screen.getByShadowRole('list')).toBe(shadowRoot.querySelector('ul'));
});
