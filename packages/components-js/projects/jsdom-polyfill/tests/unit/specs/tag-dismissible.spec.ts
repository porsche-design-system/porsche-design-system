import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-tag-dismissible');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its dismiss button to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-tag-dismissible');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.getAllByShadowRole('button')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-tag-dismissible');
  expect(screen.getByShadowRole('button')).toBe(shadowRoot.querySelector('button'));
});
