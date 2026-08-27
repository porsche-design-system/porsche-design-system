import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-checkbox');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its checkbox input to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-checkbox');
  await componentsReady();

  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  expect(screen.getAllByShadowRole('checkbox')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-checkbox');
  expect(screen.getByShadowRole('checkbox')).toBe(shadowRoot.querySelector('input#x'));
});
