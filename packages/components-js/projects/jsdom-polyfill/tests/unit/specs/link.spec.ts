import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-link');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its link to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-link');
  await componentsReady();

  expect(screen.queryAllByRole('link')).toHaveLength(0);
  expect(screen.getAllByShadowRole('link')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-link');
  expect(screen.getByShadowRole('link')).toBe(shadowRoot.querySelector('a.root'));
});
