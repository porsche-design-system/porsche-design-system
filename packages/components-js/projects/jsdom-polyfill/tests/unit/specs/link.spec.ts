import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-link');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its link to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-link');
  await componentsReady();

  expect(screen.queryAllByRole('link')).toHaveLength(0);
  expect(screen.getAllByShadowRole('link')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-link')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowRole('link')).toBe(shadowRoot.querySelector('a.root'));
});
