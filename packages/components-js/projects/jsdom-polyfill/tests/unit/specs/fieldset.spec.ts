import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-fieldset');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its group to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-fieldset');
  await componentsReady();

  expect(screen.queryAllByRole('group')).toHaveLength(0);
  expect(screen.getAllByShadowRole('group')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-fieldset');
  expect(screen.getByShadowRole('group')).toBe(shadowRoot.querySelector('fieldset'));
});
